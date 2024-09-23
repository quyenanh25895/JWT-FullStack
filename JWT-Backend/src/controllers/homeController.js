import { Route } from "express";
import connection from "../service/DBConnection";
import userService from "../service/userService";


const handleHelloWorld = (req, res) => {
    return res.render("home.ejs");
}

const handleUser = async (req, res) => {
    let userList = await userService.getUserList();
    return res.render("user.ejs", { userList });
}

const createUser = (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    userService.createNewUser(username, password, email)
    return res.redirect("/user");
}

const deleteUser = async (req, res) => {
    let id = req.params.id;
    console.log(id);
    await userService.deleteUserById(id);
    return res.redirect("/user");
}

const getUpdateUser = async (req, res) => {
    let id = req.params.id;
    console.log("ID: ", id)
    try {
        let user = await userService.getUserById(id);
        console.log("User: ", user);
        if (user !== null && user !== undefined) {
            return res.render("user-update.ejs", { user });
        } else {
            return res.redirect("/user");
        }
    } catch (err) {
        console.log(err);
    }

}

const updateUser = async (req, res) => {
    let id = req.body.id;
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email;
    await userService.updateUserById(id, username, password, email);
    return res.redirect("/user");
}

module.exports = {
    handleHelloWorld,
    handleUser,
    createUser,
    deleteUser,
    updateUser,
    getUpdateUser
}