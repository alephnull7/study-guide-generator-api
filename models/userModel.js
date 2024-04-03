const pool = require('../db/db');

class UserModel {
    constructor() {
        this.tableName = 'users';
    }

    async createUser(userData) {
        const query =
            `INSERT INTO ${this.tableName} (email, account_type, password) VALUES ($1, $2, $3) RETURNING *`;
        console.log(query);
        const values = [userData.email, userData.account_type, userData.password];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async getUser(userData) {
        const query =
            `SELECT * FROM ${this.tableName} WHERE _id = $1`;
        console.log(query);
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
        console.log(query);
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
        console.log(query);
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows[0];
    }
}

module.exports = UserModel;