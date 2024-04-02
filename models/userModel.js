const pool = require('../db/db');
console.log(pool);

class UserModel {
    constructor() {
        this.tableName = 'users';
    }

    async createUser(userData) {
        const query = `INSERT INTO ${this.tableName} (email, account_type) VALUES ($1, $2) RETURNING *`;
        console.log(query);
        const values = [userData.email, userData.account_type];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async readUser(userData) {
        const query = `SELECT * FROM ${this.tableName} WHERE _id = $1`;
        console.log(query);
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }
}

module.exports = UserModel;