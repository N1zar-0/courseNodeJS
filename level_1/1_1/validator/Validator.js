"use strict";

function Validator() {
    this.validateEmail = function(email) {
        const pattern = /^[a-z\d][a-z\d+.-]{1,19}@[\w.!$%&’*+\/=?^-]{1,15}\.[a-z]{1,5}$/i;

        return pattern.test(email);
    };


    this.validatePhone = function(number) {
        if (number.length > 25) return false;

        const pattern = /^[\s-]*(\+(\d[\s-]*){2})?(\([\s-]*(\d[\s-]*){3}\)[\s-]*|(\d[\s-]*){3})(\d[\s-]*){7}$/;

        return pattern.test(number);
    };

    this.validatePassword = function(password) {
        const pattern = /^(?=\w*[a-z])(?=\w*[A-Z])(?=\w*\d)\w{8,}$/;

        return pattern.test(password);
    };
}

module.exports = Validator;