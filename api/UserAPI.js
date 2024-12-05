import {staffArray} from "../db/db.js";

export class UserAPI{
    async saveUser(obj) {
        const data = {
            email: obj.email,
            role: obj.role
        }
        $.ajax({
            type: "POST",
            url: "http://localhost:6060/api/v1/auth/signup",

            data:  JSON.stringify(data),
            contentType: "application/json",
            processData: true,
            cache: false,
            timeout: 600000,
            success: function (response) {
                console.log("SUCCESS : ", response);
                staffArray.push(response);
                $("#create-employee-btn").prop("disabled", false);
            },
            error: function (error) {
                console.log("ERROR : ", error);
                $("#create-employee-btn").prop("disabled", false);
            },
        });
    }

    async signIn(email,password){
        return new Promise((resolve, reject) => {

            const data = {
                email:email,
                password : password,
            };
            $.ajax({
                url: "http://localhost:6060/api/v1/auth/signin",
                type: "POST",
                contentType: "application/json",
                data:JSON.stringify(data),
                success: function(response) {
                    const token = response.token;
                    if (token) {
                        localStorage.setItem('jwtToken', token);
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                },
                error: function(xhr, status, error) {
                    resolve(false);
                }
            });
        });
    }

    async changePassword(email,newPassword){
        const data = {
            "email": email,
            "newPassword": newPassword
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `http://localhost:6060/api/v1/auth/changePassword`,
                type: "POST",
                contentType: "application/json",
                data:JSON.stringify(data),
                success: function(response) {
                    resolve(true);
                },
                error: function(xhr, status, error) {
                    resolve(false);
                }
            });
        });
    }

    async sendCodeToChangePassword(email,code){

        const data = {
            "email": email,
            "code": code
        }
        return new Promise((resolve, reject) => {
            $.ajax({
                url: `http://localhost:6060/api/v1/auth/sendCode`,
                type: "POST",
                contentType: "application/json",
                data:JSON.stringify(data),
                success: function(response) {
                    resolve(true);
                },
                error: function(xhr, status, error) {
                    resolve(false);
                }
            });
        });
    }
}

