const query = require('../config/db.config');
const { multipleColumnSet } = require('../utils/common');
const Role = require('../utils/userRoles');

class UserModel {
    tableName = 'user';

    // Find all the users in the database.
    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    // Find one user in the database.
    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    // Create an user in the database.
    create = async ({ username, password, first_name, last_name, email, role = Role.SuperUser, age = 0 }) => {
        const sql = `INSERT INTO ${this.tableName}
        (username, password, first_name, last_name, email, role, age) VALUES (?,?,?,?,?,?,?)`;

        const result = await query(sql, [username, password, first_name, last_name, email, role, age]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    // Update an user in the database.
    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    // Delete an user from the database.
    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }
}

module.exports = new UserModel;