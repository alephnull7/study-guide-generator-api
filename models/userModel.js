const pool = require('../config/db');

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
            `SELECT * FROM ${this.tableName} WHERE account_type = 0`;
        console.log(query);
        const { rows } = await pool.query(query);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
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