import bcrypt from 'bcryptjs';
import DBConnect from './DBConnection'; // Đây sẽ là connection trực tiếp
import db from '../../models/index'
import { Model, where } from 'sequelize';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password, salt) => {
    return bcrypt.hashSync(password, salt);
}

const createNewUser = async (username, password, email) => {

    let hashPass = hashPassword(password, salt);
    try {
        await db.User.create({
            username: username,
            password: hashPass,
            email: email,
        });
    } catch (e) {
        console.error(e, "No");
    }
}

const getUserList = async () => {

    //test relashionship
    let newUser = await db.User.findOne({
        where: { id: 1 },
        attributes: ['id', 'username', 'email'],
        include: { model: db.Group },
        raw: true,
        nest: true
    });
    console.log("New User: ", newUser);

    let newRole = await db.Role.findOne({
        where: { id: 1 },
        include: { model: db.Group },
        raw: true,
        nest: true
    });

    let userList = [];
    try {
        userList = await db.User.findAll();
        return userList;
    } catch (err) {
        console.error('Error fetching users list:', err);
    }
}

const deleteUserById = async (id) => {
    try {
        await db.User.destroy({
            where: {
                id: id
            }
        });
    } catch (e) {
        console.error(e);
    }
}

const getUserById = async (id) => {
    try {
        const user = await db.User.findOne({
            where: {
                id: id
            }
        });
        return user.get({ plan: true });
    } catch (e) {
        console.error(e);
    }

}

const updateUserById = async (id, username, password, email) => {
    let hashPass = hashPassword(password, salt);

    try {
        await db.User.update({
            username: username,
            password: hashPass,
            email: email
        }, {
            where: {
                id: id
            }
        });
    } catch (e) {
        console.error(e);
    }
}

module.exports = {
    createNewUser,
    getUserList,
    deleteUserById,
    updateUserById,
    getUserById
}