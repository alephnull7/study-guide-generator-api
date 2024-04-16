const pool = require('../config/db');
const auth = require('../config/fireBase');
const { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } = require("firebase/auth");

class UserModel {
    constructor() {
        this.tableName = 'users';
    }

    async createUser(userData) {
        try {
            // Firebase entity creation
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            const uid = userCredential.user.uid;
            await sendEmailVerification(auth.currentUser)

            // Self-managed entity creation
            const query =
                `INSERT INTO ${this.tableName} (username, account_type, uid) VALUES ($1, $2, $3) RETURNING *`;
            const values = [userData.email.split('@')[0], userData.account_type, uid];
            await pool.query(query, values);

            const token = await userCredential.user.getIdToken();
            return { token, uid };
        } catch (e) {
            console.error(e);
            return 0;
        }
    }

    async getUser(userData) {
        const query =
            `SELECT * FROM ${this.tableName} WHERE uid = $1`;
        const values = [userData.uid];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows[0];
    }

    async loginUser(userData) {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, userData.email, userData.password);
            const uid = userCredential.user.uid;
            const token = await userCredential.user.getIdToken();
            return { token, uid };
        } catch (e) {
            console.error(e);
            return 2;
        }
    }

    async updateUser(userData) {
        const query =
            `UPDATE ${this.tableName} SET email = $1 WHERE _id = $2 RETURNING *`;
        const values = [userData.email, userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows[0];
    }

    async deleteUser(userData) {
        const query =
            `DELETE FROM ${this.tableName} WHERE _id = $1 RETURNING *`;
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows[0];
    }
}

module.exports = UserModel;