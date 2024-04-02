const pool = require('../db/db');

class UserModel {
    async createUser(userData) {
        const query =
            `INSERT INTO users (email, account_type) VALUES ($1, $2) RETURNING *`;
        console.log(query);
        const values = [userData.email, userData.account_type];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async readUserStudyGuides(userData) {
        const query =
            `SELECT * FROM artifact WHERE owner = $1 AND artifact_type = 1`;
        console.log(query);
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }
}

module.exports = UserModel;