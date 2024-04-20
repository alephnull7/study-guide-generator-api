const pool = require('../config/db');
const auth = require('../config/fireBase');
const { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } = require("firebase/auth");

class AuthModel {
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
}

module.exports = AuthModel;