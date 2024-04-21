const pool = require('../config/db');
const { auth } = require('../config/fireBase');
const { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword } = require("firebase/auth");
const UserModel = require("./userModel");
const serviceModel = require("../services/helpers/helpers");

class AuthModel {
    constructor() {
        this.tableName = 'users';
    }

    async createUser(userData) {
        try {
            const response = await serviceModel(userData, ['email', 'password', 'account_type'], null);
            if (typeof response === 'number') {
                return response;
            }

            // Firebase entity creation
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
            const uid = userCredential.user.uid;
            await sendEmailVerification(auth.currentUser)
            const token = await userCredential.user.getIdToken();

            // Self-managed entity creation
            const query =
                `INSERT INTO ${this.tableName} (username, account_type, uid) VALUES ($1, $2, $3) RETURNING *`;
            const values = [userData.email.split('@')[0], userData.account_type, uid];
            const user = await pool.query(query, values);

            return { token, uid, username: user.username, account_type: user.account_type };
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

            const tempData = { uid };
            const user = await serviceModel(tempData, ['uid'], new UserModel().getUser(tempData));
            return { token, uid, username: user.username, account_type: user.account_type };
        } catch (e) {
            console.error(e);
            return 2;
        }
    }
}

module.exports = AuthModel;