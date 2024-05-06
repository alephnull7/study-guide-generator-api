/*
    Author: Gregory Smith
    Date: May 6, 2024
    Description: Responsible for executing queries to the PostgreSQL pool connection relating to artifacts.
        Additionally, one of the class methods indirectly calls an OpenAI connection.
*/

const pool = require('../config/db');
const createArtifact = require('../artifactGeneration/artifactCreation');
const serviceModel = require("../services/helpers/helpers");
const ClassroomModel = require("./classroomModel");
const PDFDocument = require('pdfkit');

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
        // create artifact content
        const template = await this.getTemplate({id: userData.template_id});
        const content = await createArtifact(template.messages);

        // create artifact
        const query =
            `INSERT INTO ${this.tableName} (owner, template, name, content) VALUES ($1, $2, $3, $4) RETURNING *`;
        const values = [userData.uid, userData.template_id, userData.name, content];
        const { rows } = await pool.query(query, values);

        // assign to classrooms
        if (Array.isArray(userData.classrooms) && userData.classrooms.length > 0) {
            for (const classroom of userData.classrooms) {
                const tempData = {
                    id: classroom,
                    artifacts: [rows[0]._id]
                };
                await serviceModel(tempData, ['id', 'artifacts'], new ClassroomModel().addArtifacts(tempData));
            }
        }

        return rows[0];
    }

    async readArtifact(userData) {
        const query =
            `SELECT * FROM ${this.tableName} WHERE _id = $1`;
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
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
            `SELECT artifact._id as id, artifact.name AS name, course.name AS course,
                CONCAT(department.short_name, ' ', course.number) AS code, department.name AS department
            FROM artifact
            JOIN artifact_template ON artifact.template = artifact_template._id
            JOIN course ON artifact_template.course = course._id
            JOIN department ON course.department = department._id
            JOIN users on artifact.owner = users.uid
            WHERE users.uid = $1 AND type = 1`;
        const values = [userData.uid];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async readUserAssignedStudyGuides(userData) {
        const query =
            `SELECT artifact._id as id, artifact.name AS name, course.name AS course,
                CONCAT(department.short_name, ' ', course.number) AS code, department.name AS department
            FROM artifact
            JOIN classroom_artifact ON artifact._id = classroom_artifact.artifact_id
            JOIN classroom_student ON classroom_artifact.classroom_id = classroom_student.classroom_id
            JOIN users ON classroom_student.student_id = users.uid
            JOIN artifact_template ON artifact.template = artifact_template._id
            JOIN course ON artifact_template.course = course._id
            JOIN department ON course.department = department._id
            WHERE users.uid = $1 AND type = 1`;
        const values = [userData.uid];
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
        if (typeof assignedQuizzes !== 'number') {
            quizzes = quizzes.concat(assignedQuizzes);
        }
        if (quizzes.length === 0) {
            return 1;
        }
        return quizzes;
    }

    async readUserOwnedQuizzes(userData) {
        const query =
            `SELECT artifact._id as id, artifact.name AS name, course.name AS course,
            CONCAT(department.short_name, ' ', course.number) AS code, department.name AS department
            FROM artifact
            JOIN artifact_template ON artifact.template = artifact_template._id
            JOIN course ON artifact_template.course = course._id
            JOIN department ON course.department = department._id
            JOIN users on artifact.owner = users.uid
            WHERE users.uid = $1 AND type = 2`;
        const values = [userData.uid];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async readUserAssignedQuizzes(userData) {
        const query =
            `SELECT artifact._id as id, artifact.name AS name, course.name AS course,
            CONCAT(department.short_name, ' ', course.number) AS code, department.name AS department
            FROM artifact
            JOIN classroom_artifact ON artifact._id = classroom_artifact.artifact_id
            JOIN classroom_student ON classroom_artifact.classroom_id = classroom_student.classroom_id
            JOIN users ON classroom_student.student_id = users.uid
            JOIN artifact_template ON artifact.template = artifact_template._id
            JOIN course ON artifact_template.course = course._id
            JOIN department ON course.department = department._id
            WHERE users.uid = $1 AND type = 2`;
        const values = [userData.uid];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async getTemplates() {
        let query =
            `SELECT ${this.templateSelect()}
            FROM artifact_template
            JOIN course ON artifact_template.course = course._id
            JOIN department ON course.department = department._id
            ${this.templateOrder()}`;
        const { rows } = await pool.query(query);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async getStudyGuideTemplates() {
        let query =
            `SELECT ${this.templateSelect()}
            FROM artifact_template
            JOIN course ON artifact_template.course = course._id
            JOIN department ON course.department = department._id
            WHERE artifact_template.type = 1
            ${this.templateOrder()}`;
        const { rows } = await pool.query(query);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async getQuizTemplates() {
        let query =
            `SELECT ${this.templateSelect()}
            FROM artifact_template
            JOIN course ON artifact_template.course = course._id
            JOIN department ON course.department = department._id
            WHERE artifact_template.type = 2
            ${this.templateOrder()}`;
        const { rows } = await pool.query(query);
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
            `SELECT ${this.templateSelect()}
            FROM artifact_template
            JOIN course ON artifact_template.course = course._id
            JOIN department ON course.department = department._id
            JOIN artifact_type ON artifact_template.type = artifact_type._id
            WHERE course._id = $1
            ${this.templateOrder()}`;
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async getStudyGuideTemplatesForCourse(userData) {
        const query =
            `SELECT ${this.templateSelect()}
            FROM artifact_template
            JOIN course ON artifact_template.course = course._id
            JOIN department ON course.department = department._id
            JOIN artifact_type ON artifact_template.type = artifact_type._id
            WHERE course._id = $1 AND artifact_template.type = 1
            ${this.templateOrder()}`;
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async getQuizTemplatesForCourse(userData) {
        const query =
            `SELECT ${this.templateSelect()}
            FROM artifact_template
            JOIN course ON artifact_template.course = course._id
            JOIN department ON course.department = department._id
            JOIN artifact_type ON artifact_template.type = artifact_type._id
            WHERE course._id = $1 AND artifact_template.type = 2
            ${this.templateOrder()}`;
        const values = [userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async getTemplatesForDepartment(userData) {
        const query =
            `SELECT ${this.templateSelect()}
            FROM artifact_template
            JOIN course ON artifact_template.course = course._id
            JOIN department ON course.department = department._id
            JOIN artifact_type ON artifact_template.type = artifact_type._id
            WHERE department._id = $1
            ${this.templateOrder()}`;
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

    async getTypes() {
        const query =
            `SELECT _id AS id, name FROM artifact_type`;
        const { rows } = await pool.query(query);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async deleteArtifact(userData) {
        try {
            const values = [userData.id];

            const junctionQuery =
                `DELETE FROM classroom_artifact WHERE artifact_id = $1`;
            await pool.query(junctionQuery, values);

            const query =
                `DELETE FROM ${this.tableName} WHERE _id = $1 RETURNING *`;
            const { rows } = await pool.query(query, values);

            if (rows.length === 0) {
                return 1;
            }
            return rows[0];
        } catch(e) {
            console.log(e);
            return 0;
        }
    }

    async updateArtifact(userData) {
        const query =
            `UPDATE ${this.tableName} SET name = $1 WHERE _id = $2 RETURNING *`;
        const values = [userData.name, userData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows[0];
    }

    templateSelect() {
        return `artifact_template.type AS type,
            artifact_template._id AS id, 
            artifact_template.name AS name, 
            course.name AS course, 
            department.name AS department, 
            CONCAT(department.short_name, ' ', course.number) AS course_code`;
    }

    templateOrder() {
        return "ORDER BY (REGEXP_MATCH(artifact_template.name, '[0-9]+'))[1]::INTEGER, artifact_template.name";
    }

    async getPDF(userData) {
        const artifact = await this.readArtifact(userData);
        if (typeof artifact === 'number') {
            return artifact;
        }

        const doc = new PDFDocument();

        // Artifact title
        const titleSize = 24;
        doc.fontSize(titleSize);
        const artifactName = artifact.name;
        const textWidth = doc.widthOfString(artifactName);
        const xTitle = (doc.page.width - textWidth) / 2;
        doc.font('Times-Roman').fontSize(titleSize).text(artifactName, xTitle, doc.y);
        doc.fontSize(12);

        // Content of artifact
        const vertDelta = 25;
        const horizontal = 50;
        for (const problem of artifact.content.problems) {
            const question = problem.question;
            const answer = problem.answer;
            const contentHeight = doc.heightOfString(question) + doc.heightOfString(answer) + vertDelta;

            const remainingSpace = doc.page.height - doc.y;
            console.log(contentHeight, remainingSpace);
            if (remainingSpace < contentHeight) {
                doc.addPage();
            }
            console.log(doc.y);

            doc.font('Helvetica-Bold').text(question, horizontal, doc.y + vertDelta * 2);
            doc.font('Helvetica').text(answer, horizontal, doc.y + vertDelta);
        }

        // Create Buffer to used in response
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        doc.end();

        await new Promise((resolve, reject) => {
            doc.on('end', resolve);
            doc.on('error', reject);
        });

        return {
            buffer: Buffer.concat(buffers),
            name: artifact.name
        };
    }
}

module.exports = ArtifactModel;