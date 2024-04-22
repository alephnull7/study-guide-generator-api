const pool = require('../config/db');
const serviceModel = require("../services/helpers/helpers");
const UserModel = require("./userModel");

class ClassroomModel {
    constructor() {
        this.tableName = 'classroom';
    }

    async createClassroom(classroomData) {
        const tempData = { uid: classroomData.uid };
        const user = await serviceModel(tempData, ['uid'], new UserModel().getUser(tempData));

        // create classroom
        const query =
            `INSERT INTO ${this.tableName} (name, instructed, course) VALUES ($1, $2, $3) RETURNING *`;
        const values = [classroomData.name, user._id, classroomData.course_id];
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

    async getClassroom(classroomData) {
        const query =
            `SELECT classroom._id AS classroom_id, classroom.name AS classroom_name, 
                users._id AS student_id, users.username AS student_username
            FROM classroom
            LEFT JOIN classroom_student ON classroom._id = classroom_student.classroom_id
            LEFT JOIN users ON classroom_student.student_id = users._id
            WHERE classroom._id = $1`;
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
            JOIN users ON classroom.instructed = users._id
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
        const query =
            `DELETE FROM ${this.tableName} WHERE _id = $1 RETURNING *`;
        const values = [classroomData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows[0];
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