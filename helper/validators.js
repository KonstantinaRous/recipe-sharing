const user = require("../models/user");

function emailValidator(email) {
    if (email) {
        const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        return emailRegex.test(email);
    }
    return false;

}
function passwordValidator(password) {
    if (password) {
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;
        if (alphanumericRegex.test(password)) {
            const password_len = password.length;
            if (password_len >= 8 && password_len <= 32) {
                return true;
            }
        }
    }
    return false;
}
function usernameValidator(username) {
    if (username) {
        if (username.length != 0)
            return true;
    }
    return false;
}
function stringValidator(string) {
    if (string) {
        if (string.length > 0)
            return true;
    }
    return false
}

function dateValidator(date) {
    if (Object.is(NaN, Date.parse(date)))
        return false;
    return true;
}

function ratingValidator(rating) {
    if (rating) {
        if (rating >= 1 && rating <= 5)
            return true;
    }
    return false;
}

function pathValidator(path) {
    if (path) {
        if (path.length > 0)
            return true;
    }
    return false;
}

module.exports = { emailValidator, passwordValidator, usernameValidator, stringValidator, dateValidator, pathValidator, ratingValidator }; 