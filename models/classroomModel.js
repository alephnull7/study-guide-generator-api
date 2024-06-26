/*
    Author: Gregory Smith
    Date: May 6, 2024
    Description: Responsible for executing queries to the PostgreSQL pool connection relating to classrooms
*/

const pool = require('../config/db');

class ClassroomModel {
    constructor() {
        this.tableName = 'classroom';
    }

    async createClassroom(classroomData) {
        // create classroom
        const query =
            `INSERT INTO ${this.tableName} (name, instructed, course) VALUES ($1, $2, $3) RETURNING *`;
        const values = [classroomData.name, classroomData.uid, classroomData.course_id];
        const { rows } = await pool.query(query, values);

        // add students
        if (Array.isArray(classroomData.students) && classroomData.students.length > 0) {
            const tempData = {
                id: rows[0]._id,
                students: classroomData.students
            };
            await this.addStudents(tempData);
        }

        return rows[0];
    }

    async getClassroomStudents(classroomData) {
        const query =
            `SELECT users.uid AS uid, users.username AS username
            FROM classroom
            JOIN classroom_student ON classroom._id = classroom_student.classroom_id
            JOIN users ON classroom_student.student_id = users.uid
            WHERE classroom._id = $1`;
        const values = [classroomData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async getClassroomArtifacts(classroomData) {
        const query =
            `SELECT artifact._id as id, artifact.name AS name, course.name AS course,
                CONCAT(department.short_name, ' ', course.number) AS code, department.name AS department
            FROM classroom
            JOIN classroom_artifact ON classroom._id = classroom_artifact.classroom_id
            JOIN artifact ON classroom_artifact.artifact_id = artifact._id
            JOIN artifact_template ON artifact.template = artifact_template._id
            JOIN course ON artifact_template.course = course._id
            JOIN department ON course.department = department._id
            WHERE classroom._id = $1`;
        const values = [classroomData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async getClassroomStudyGuides(classroomData) {
        const query =
            `SELECT artifact._id as id, artifact.name AS name, course.name AS course,
                CONCAT(department.short_name, ' ', course.number) AS code, department.name AS department
            FROM classroom
            JOIN classroom_artifact ON classroom._id = classroom_artifact.classroom_id
            JOIN artifact ON classroom_artifact.artifact_id = artifact._id
            JOIN artifact_template ON artifact.template = artifact_template._id
            JOIN course ON artifact_template.course = course._id
            JOIN department ON course.department = department._id
            WHERE classroom._id = $1 AND type = 1`;
        const values = [classroomData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async getClassroomQuizzes(classroomData) {
        const query =
            `SELECT artifact._id as id, artifact.name AS name, course.name AS course,
                CONCAT(department.short_name, ' ', course.number) AS code, department.name AS department
            FROM classroom
            JOIN classroom_artifact ON classroom._id = classroom_artifact.classroom_id
            JOIN artifact ON classroom_artifact.artifact_id = artifact._id
            JOIN artifact_template ON artifact.template = artifact_template._id
            JOIN course ON artifact_template.course = course._id
            JOIN department ON course.department = department._id
            WHERE classroom._id = $1 AND type = 2`;
        const values = [classroomData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async getClassrooms(classroomData) {
        const query =
            `SELECT classroom._id AS id, classroom.name AS name, course.name AS course,
                CONCAT(department.short_name, ' ', course.number) AS code, department.name AS department
            FROM classroom
            JOIN users ON classroom.instructed = users.uid
            JOIN course ON classroom.course = course._id
            JOIN department on course.department = department._id
            WHERE users.uid = $1`;
        const values = [classroomData.uid];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async getClassroomsForCourse(classroomData) {
        const query =
            `SELECT classroom._id AS id, classroom.name AS name, course.name AS course,
                CONCAT(department.short_name, ' ', course.number) AS code, department.name AS department
            FROM classroom
            JOIN users ON classroom.instructed = users.uid
            JOIN course ON classroom.course = course._id
            JOIN department on course.department = department._id
            WHERE users.uid = $1 AND course._id = $2`;
        const values = [classroomData.uid, classroomData.course];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async updateClassroom(classroomData) {
        const query =
            `UPDATE ${this.tableName} SET name = $1 WHERE _id = $2 RETURNING *`;
        const values = [classroomData.name, classroomData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows[0];
    }

    async deleteClassroom(classroomData) {
        try {
            const values = [classroomData.id];

            const studentJunctionQuery =
                `DELETE FROM classroom_student WHERE classroom_id = $1`;
            await pool.query(studentJunctionQuery, values);

            const artifactJunctionQuery =
                `DELETE FROM classroom_artifact WHERE classroom_id = $1`;
            await pool.query(artifactJunctionQuery, values);

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

    async addStudents(classroomData) {
        const students = classroomData.students;
        const id = classroomData.id;
        let valuesStr = '';
        let values = [];
        let placeholder = 1;
        for (let i = 0; i < students.length; i ++) {
            values.push(students[i]);
            values.push(id);
            valuesStr += `($${placeholder}, $${placeholder+1})`;
            if (i < students.length-1) {
                valuesStr += ', ';
            }
            placeholder += 2;
        }
        const query =
            `INSERT INTO classroom_student (student_id, classroom_id) VALUES ${valuesStr} RETURNING *`;
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async removeStudents(classroomData) {
        const students = classroomData.students;
        let valuesStr = '';
        for (let i = 1; i <= students.length; i ++) {
            valuesStr += `$${i+1}`;
            if (i < students.length) {
                valuesStr += ', ';
            }
        }
        const query =
            `DELETE from classroom_student WHERE classroom_id = $1 AND student_id IN (${valuesStr}) RETURNING *`;
        const values = [classroomData.id, ...classroomData.students];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async addArtifacts(classroomData) {
        const artifacts = classroomData.artifacts;
        const id = classroomData.id;
        let valuesStr = '';
        let values = [];
        let placeholder = 1;
        for (let i = 0; i < artifacts.length; i ++) {
            values.push(artifacts[i]);
            values.push(id);
            valuesStr += `($${placeholder}, $${placeholder+1})`;
            if (i < artifacts.length-1) {
                valuesStr += ', ';
            }
            placeholder += 2;
        }
        const query =
            `INSERT INTO classroom_artifact (artifact_id, classroom_id) VALUES ${valuesStr} RETURNING *`;
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async removeArtifacts(classroomData) {
        const artifacts = classroomData.artifacts;
        let valuesStr = '';
        for (let i = 1; i <= artifacts.length; i ++) {
            valuesStr += `$${i+1}`;
            if (i < artifacts.length) {
                valuesStr += ', ';
            }
        }
        const query =
            `DELETE from classroom_artifact WHERE classroom_id = $1 AND artifact_id IN (${valuesStr}) RETURNING *`;
        const values = [classroomData.id, ...classroomData.artifacts];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }
}

module.exports = ClassroomModel;