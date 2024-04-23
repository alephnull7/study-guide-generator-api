const pool = require('../config/db');
const { getAuth } = require('firebase-admin/auth');

class UserModel {
    constructor() {
        this.tableName = 'users';
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

    async getStudents() {
        const query =
            `SELECT _id AS id, username FROM ${this.tableName} WHERE account_type = 0`;
        const { rows } = await pool.query(query);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async updateUser(userData) {
        const uid = userData.uid;

        // Firebase entity update
        const firebaseProps = ['email', 'password'];
        const submitProps = {};
        for (const prop of firebaseProps) {
            if (userData.hasOwnProperty(prop)) {
                submitProps[prop] = userData[prop]
            }
        }
        if (Object.keys(submitProps).length > 0) {
            await getAuth().updateUser(uid, submitProps);
        }

        // Self-managed entity update
        if (userData.hasOwnProperty('username')) {
            const query =
                `UPDATE ${this.tableName} SET username = $1 WHERE uid = $2 RETURNING *`;
            const values = [userData.username, uid];
            const { rows } = await pool.query(query, values);

            if (rows.length === 0) {
                return 1;
            }
            return rows[0];
        } else {
            return await this.getUser(userData);
        }
    }

    async deleteUser(userData) {
        const uid = userData.uid;

        try {
            // Self-managed entity deletion
            const query =
                `DELETE FROM ${this.tableName} WHERE uid = $1 RETURNING *`;
            const values = [uid];
            const { rows } = await pool.query(query, values);
            if (rows.length === 0) {
                return 1;
            }

            // Firebase entity deletion
            await getAuth().deleteUser(uid);

            return rows[0];
        } catch (e) {
            console.log(e);
            switch (e.code) {
                case 'auth/user-not-found':
                    return 1;
                default:
                    return 0;
            }
        }
    }
}

module.exports = UserModel;