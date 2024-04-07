const pool = require('../db/db');

class ClassroomModel {
    constructor() {
        this.tableName = 'classroom';
    }

    async createClassroom(classroomData) {
        console.log(classroomData)
        const query =
            `INSERT INTO ${this.tableName} (name, instructed) VALUES ($1, $2) RETURNING *`;
        const values = [classroomData.name, classroomData.user_id];
        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    async getClassrooms(classroomData) {
        const query =
            `SELECT classroom._id AS classroom_id, classroom.name AS classroom_name, 
                users._id AS student_id, users.email AS student_email
            FROM classroom
            LEFT JOIN classroom_student ON classroom._id = classroom_student.classroom_id
            LEFT JOIN users ON classroom_student.student_id = users._id
            WHERE instructed = $1`;
        const values = [classroomData.id];
        const { rows } = await pool.query(query, values);
        if (rows.length === 0) {
            return 1;
        }
        return rows;
    }

    async addToClassroom(classroomData) {
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

    async removeFromClassroom(classroomData) {
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

    async assignToClassroom(classroomData) {
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
}

module.exports = ClassroomModel;