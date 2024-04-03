const pool = require('../db/db');

class ArtifactModel {
    constructor() {
        this.tableName = 'artifact';
    }

    async readUserStudyGuides(userData) {
        let studyGuides = await this.readUserOwnedStudyGuides(userData);
        studyGuides = studyGuides.concat(await this.readUserAssignedStudyGuides(userData));
        return studyGuides;
    }

    async readUserOwnedStudyGuides(userData) {
        const query =
            `SELECT * FROM ${this.tableName} WHERE owner = $1 AND artifact_type = 1`;
        console.log(query);
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        console.log(rows);
        return rows;
    }

    async readUserAssignedStudyGuides(userData) {
        const query =
            `SELECT artifact._id, artifact.artifact_type, artifact.name, artifact.content
            FROM artifact
            JOIN classroom_artifact ON artifact._id = classroom_artifact.artifact_id
            JOIN classroom_student ON classroom_artifact.classroom_id = classroom_student.classroom_id
            JOIN users ON classroom_student.student_id = users._id
            WHERE users._id = $1 AND artifact_type = 1`;
        console.log(query);
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        console.log(rows);
        return rows;
    }

    async readUserQuizzes(userData) {
        const query =
            `SELECT * FROM ${this.tableName} WHERE owner = $1 AND artifact_type = 2`;
        console.log(query);
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }
}

module.exports = ArtifactModel;