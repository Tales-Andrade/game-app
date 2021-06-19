const UserModel = require('../models/user');
const HttpException = require('../utils/HttpException');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

class UserController {
    renderAdmin = async (req, res, next) => {
        let userList = await UserModel.find();

        if (!userList.length) {
            throw new HttpException(404, 'Users not found');
        }

        userList = userList.map(user => {
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        });

        res.render('users/admin', { userList });
    };

    renderRegister = (req, res) => {
        res.render('users/register');
    };

    renderLogin = (req, res) => {
        res.render('users/login');
    };

    userLogout = (req, res) => {
        req.logout();
        req.flash('success', 'Successfully logged out!');
        res.redirect('/');
    };
}

module.exports = new UserController;