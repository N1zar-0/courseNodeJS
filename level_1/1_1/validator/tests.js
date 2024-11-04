"use strict";

import Validator from "./Validator.js";

function testValidateEmail(v){
    let emails = ["fi@secondpart.end", "first-part@.se=cond%p.art.end", "first.part@se=cond%part.r",
        "f@secondart.end,", "first-part@.se=cond@part.end", "-firstpart@.se=cond%.enddeded", "firs_tpart@.se.en",
        "firstpart@.se.enddeded"]

    for (let email of emails) {
        console.log(email + " is a valid email: " + v.validateEmail(email));
    }

    console.log("\n");

}

function testValidatePhone(v){
    let numbers = ["+38 (099) 567 8901", "+38 099 5 6 7 8 9  01", "+3-8 0--99 5 6 7 8901", "(09-9) 567-890-1", "--  (099) 567 890-1",
        "+38 (099) 567 8901 0", "+38 099 a0000000", "+38 (0989) 567 8901", "+48 (0989) 567 8901"];

    for (let number of numbers) {
        console.log(number + " is a valid number: " + v.validatePhone(number));
    }

    console.log("\n");
}

function testValidatePasswords(v){
    let passwords = ["C00l_Pass", "SupperPas1", "A_a_8______", "_A_8a_____", "_a_A7______", "_a_7A______",
        "_7_aA______","_______7_Aa", "45", "C00l _Pass","Cool_pass", "C00l"];

    for (let password of passwords) {
        console.log(password + " is a valid password: " + v.validatePassword(password));
    }
    console.log("\n");
}


let v = new Validator();
testValidateEmail(v);
testValidatePhone(v);
testValidatePasswords(v);