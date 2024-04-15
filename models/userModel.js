const pool = require('../config/db');

class UserModel {
    constructor() {
        this.tableName = 'users';
    }

    async createUser(userData) {
        const query =
            `INSERT INTO ${this.tableName} (account_type, uid) VALUES ($1, $2) RETURNING *`;
        const values = [userData.account_type, userData.uid];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async getUser(userData) {
        const query =
            `SELECT * FROM ${this.tableName} WHERE _id = $1`;
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows[0];
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