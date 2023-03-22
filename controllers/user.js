const { models: { User, Rating, Recipe, Photo } } = require("../models");
const { emailValidator, passwordValidator, usernameValidator, dateValidator } = require('../helper/validators');
const { dateFormater } = require('../helper/formaters');
const { destroyUser } = require('../helper/destroyers')


async function userChecker(user, username, password, res) {
    if (user) {
        if (password) {
            if (user.password == password) {
                return true;
            }
            else
                res.send("incorrect password");
        }
        else
            res.send("password must be provided");
    }
    else
        res.send("user does not exist");
    return false;
}

module.exports = {
    getUsers: async (req, res) => {
        // Return list of all users
        const list_of_all = await User.findAll();
        res.json(list_of_all);
    },

    // Function for creating a new user
    create: async (req, res) => {
        // Check if the username already exists in the database
        if (usernameValidator(req.body.username)) {
            const name = await User.findOne({
                where: {
                    username: req.body.username,
                },
            });
            // Check if the email already exists in the database
            if (emailValidator(req.body.email)) {
                const mail = await User.findOne({
                    where: {
                        email: req.body.email,
                    },
                });
                // If both username and email are unique
                if (name == null && mail == null) {
                    // Check if the password is valid
                    if (passwordValidator(req.body.password)) {
                        const date = dateFormater(req.body.year, req.body.month, req.body.day);
                        if (dateValidator(date)) {
                            try {
                                // Create the user and save it to the database
                                await User.create({
                                    username: req.body.username,
                                    password: req.body.password,
                                    email: req.body.email,
                                    date_of_birth: date
                                });
                                res.send("user has been created: ");
                            }
                            catch {
                                // If there was an error creating the user
                                res.send("an error occurred while creating user");
                            }
                        }
                        else
                            res.send("not a valid date");
                    }
                    else
                        // If the password is not valid
                        res.send("not a valid password");
                }
                // If both username and email are not unique
                else if ((name != null && mail != null)) {
                    res.send("username and email already in use");
                }
                // If only username is not unique
                else if (name != null)
                    res.send("username already in use");
                // If only email is not unique
                else if (mail != null)
                    res.send("email already in use");
            }
            else
                res.send("not a valid email adress");
        }
        else
            res.send("not a valid username");
        // End the response
        res.end();

    },

    // update_username function: updates the username for a given user
    update_username: async (req, res) => {
        // check if the new username is valid using the usernameValidator function
        if (req.body.username) {
            // find the user in the database based on the provided username
            const user = await User.findOne({ where: { username: req.body.username } });
            // check the validity of the user's credentials using the userChecker function
            if (await userChecker(user, req.body.username, req.body.password, res)) {
                // check if the new username is already in use
                if (usernameValidator(req.body.new_username)) {
                    if (!(await User.findOne({ where: { username: req.body.new_username } }))) {
                        // if the new username is valid and available, update the user's username
                        user.username = req.body.new_username;
                        try {
                            await user.save();
                            // send a response indicating that the username has been updated
                            res.send("username has been updated");
                        }
                        catch {
                            res.send("username update has failed")
                        }
                    }
                    else
                        // if the new username is already in use, send a response indicating so
                        res.send("username already in use");
                }
                else
                    req.send("not a valid new username");
            }
        }
        else {
            // if the new username is invalid, send a response indicating so
            res.send("username must be provided");
        }
    },

    // update_email function: updates the email address for a given user
    update_email: async (req, res) => {
        if (req.body.username) {
            // find the user in the database based on the provided username
            const user = await User.findOne({ where: { username: req.body.username } });
            // check the validity of the user's credentials using the userChecker function
            if (await userChecker(user, req.body.username, req.body.password, res)) {
                // check if the new email address is valid using the emailValidator function
                if (emailValidator(req.body.new_email)) {
                    // check if the new email address is different from the current one
                    if (req.body.new_email != user.email) {
                        // check if the new email address is already in use
                        if (!(await User.findOne({ where: { email: req.body.new_email } }))) {
                            // if the new email address is valid and available, update the user's email address
                            user.email = req.body.new_email;
                            try {
                                await user.save();
                                // send a response indicating that the email address has been updated
                                res.send("email address has been updated");
                            }
                            catch {
                                res.send("email adress update has failed");
                            }
                        }
                        else
                            // if the new email address is already in use, send a response indicating so
                            res.send("email is already in use");
                    }
                    else
                        // if the new email address is the same as the old one, send a response indicating so
                        res.send("new email address cannot be the same as the old address");
                }
                else
                    // if the new email address is invalid, send a response indicating so
                    res.send("not a valid email address");
            }
        }
        else {
            // if the new username is invalid, send a response indicating so
            res.send("username must be provided");
        }
    },

    // Async function to update user password
    update_password: async (req, res) => {
        if (req.body.username) {
            // Find user based on username
            const user = await User.findOne({ where: { username: req.body.username } });
            // Check if user exists and password matches
            if (await userChecker(user, req.body.username, req.body.password, res)) {
                // Validate new password
                if (passwordValidator(req.body.new_password)) {
                    // Check if new password is different from old password
                    if (req.body.new_password != user.password) {
                        // Check if new password matches repeat password
                        if (req.body.password == req.body.repeatpassword) {
                            // Update user's password and save changes
                            user.password = req.body.new_password;
                            try {
                                await user.save();
                                res.send("password has been updated");
                            }
                            catch {
                                res.send("password update has failed");
                            }
                        }
                        else
                            // if the two passwords are not the same, send a response indicating so 
                            res.send("password and repeat password do not much");
                    }
                    else
                        // if the new password is the same with the old one, send a response indicating so
                        res.send("new password can not be the same as the old one");
                }
                else
                    // if the new password is not a valid password, send a response indicating so
                    res.send("not a valid password");
            }
        }
        else
            res.send("username must be provided");

    },

    updateDateOfBirth: async (req, res) => {
        if (req.body.username) {
            const user = await User.findOne({ where: { username: req.body.username } });
            // Check if user exists and password matches
            if (await userChecker(user, req.body.username, req.body.password, res)) {
                const date = dateFormater(req.body.year, req.body.month, req.body.day);
                if (dateValidator(date)) {
                    user.date_of_birth = date;
                    try {
                        await user.save();
                        res.send("date of birth has been updated");
                    }
                    catch {
                        res.send("date of birth update has failed");
                    }
                }
                else
                    res.send("not a valid date");
            }
        }
        else
            res.send("username must be provided");
    },

    deleteUser: async (req, res) => {
        if (usernameValidator(req.body.username)) {
            const user = await User.findOne({ where: { username: req.body.username } });
            if (await userChecker(user, req.body.username, req.body.password, res)) {
                if (await destroyUser(user))
                    res.send("user has been removed");
                else
                    res.send("user deletion failed");
            }
        }
        else
            res.send("username must be provided");
    }
};
