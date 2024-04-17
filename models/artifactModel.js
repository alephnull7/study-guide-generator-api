const pool = require('../config/db');
const createArtifact = require('../artifactGeneration/artifactCreation');

class ArtifactModel {
    constructor() {
        this.tableName = 'artifact';
    }

    async createArtifactTemplate(userData) {
        const query =
            `INSERT INTO artifact_template (messages, type, name, course) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [JSON.stringify(userData.messages), userData.type, userData.name, userData.course];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async createArtifact(userData) {
        const template = await this.getTemplate({id: userData.template_id});
        const content = await createArtifact(template.messages);
        const query =
            `INSERT INTO ${this.tableName} (owner, template, name, content) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [userData.user_id, userData.template_id, userData.name, content];
        const { rows } = await pool.query(query, values);
        return rows[0];
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
            `SELECT artifact._id AS artifact_id, artifact_template.type AS type, artifact.name AS name, artifact.content AS content
            FROM artifact
            JOIN artifact_template ON artifact.template = artifact_template._id
            WHERE owner = $1 AND type = 1`;
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async readUserAssignedStudyGuides(userData) {
        const query =
            `SELECT artifact._id AS artifact_id, artifact_template.type AS type, artifact.name AS name, artifact.content AS content
            FROM artifact
            JOIN classroom_artifact ON artifact._id = classroom_artifact.artifact_id
            JOIN classroom_student ON classroom_artifact.classroom_id = classroom_student.classroom_id
            JOIN users ON classroom_student.student_id = users._id
            JOIN artifact_template ON artifact.template = artifact_template._id
            WHERE users._id = $1 AND type = 1`;
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async readUserQuizzes(userData) {
        let quizzes = [];
        const ownedQuizzes = await this.readUserOwnedQuizzes(userData);
        if (typeof ownedQuizzes !== 'number') {
            quizzes = quizzes.concat(ownedQuizzes);
        }
        const assignedQuizzes = await this.readUserAssignedQuizzes(userData);
        if (typeof assignedStudyGuides !== 'number') {
            quizzes = quizzes.concat(assignedQuizzes);
        }
        if (quizzes.length === 0) {
            return 1;
        }
        return quizzes;
    }

    async readUserOwnedQuizzes(userData) {
        const query =
            `SELECT artifact._id AS artifact_id, artifact_template.type AS type, artifact.name AS name, artifact.content AS content
            FROM artifact
            JOIN artifact_template ON artifact.template = artifact_template._id
            WHERE owner = $1 AND type = 2`;
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async readUserAssignedQuizzes(userData) {
        const query =
            `SELECT artifact._id AS artifact_id, artifact_template.type AS type, artifact.name AS name, artifact.content AS content
            FROM artifact
            JOIN classroom_artifact ON artifact._id = classroom_artifact.artifact_id
            JOIN classroom_student ON classroom_artifact.classroom_id = classroom_student.classroom_id
            JOIN users ON classroom_student.student_id = users._id
            JOIN artifact_template ON artifact.template = artifact_template._id
            WHERE users._id = $1 AND type = 2`;
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async getTemplate(userData) {
        const query =
            `SELECT * FROM artifact_template
            WHERE _id = $1`;
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows[0];
    }

    async getTemplatesForCourse(userData) {
        const query =
            `SELECT artifact_template._id AS id, artifact_type.name AS type, course.name AS course_name, CONCAT(department.short_name, ' ', course.number) AS course_code, artifact_template.name AS name FROM artifact_template
            JOIN course ON artifact_template.course = course._id
            JOIN department ON course.department = department._id
            JOIN artifact_type ON artifact_template.type = artifact_type._id
            WHERE course._id = $1`;
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async getCourses() {
        const query =
            `SELECT course._id AS id, course.name AS name, CONCAT(department.short_name, ' ', course.number) AS code, department.name AS department FROM course
            JOIN department on course.department = department._id`;
        const { rows } = await pool.query(query);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async getCoursesForDepartment(userData) {
        const query =
            `SELECT course._id AS id, course.name AS name, CONCAT(department.short_name, ' ', course.number) AS code FROM course
            JOIN department on course.department = department._id
            WHERE department._id = $1`;
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async getDepartments() {
        const query =
            `SELECT _id AS id, name, short_name FROM department`;
        const { rows } = await pool.query(query);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }
}

module.exports = ArtifactModel;