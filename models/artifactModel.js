const pool = require('../config/db');

class ArtifactModel {
    constructor() {
        this.tableName = 'artifact';
    }

    async readUserStudyGuides(userData) {
        let studyGuides = [];
        const ownedStudyGuides = await this.readUserOwnedStudyGuides(userData);
        if (typeof ownedStudyGuides !== 'number') {
            studyGuides = studyGuides.concat(ownedStudyGuides);
        }
        const assignedStudyGuides = await this.readUserAssignedStudyGuides(userData);
        if (typeof assignedStudyGuides !== 'number') {
            studyGuides = studyGuides.concat(assignedStudyGuides);
        }
        if (studyGuides.length === 0) {
            return 1;
        }
        return studyGuides;
    }

    async readUserOwnedStudyGuides(userData) {
        const query =
            `SELECT * FROM ${this.tableName} WHERE owner = $1 AND artifact_type = 1`;
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
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
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async readUserQuizzes(userData) {
        const query =
            `SELECT * FROM ${this.tableName} WHERE owner = $1 AND artifact_type = 2`;
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }
}

module.exports = ArtifactModel;