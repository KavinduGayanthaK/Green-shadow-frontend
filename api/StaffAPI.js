import {staffArray} from "../db/db.js";

export class StaffAPI {
    async saveStaff(obj1) {
        const data = {
            firstName: obj1.firstName,
            lastName: obj1.lastName,
            designation: obj1.designation,
            gender: obj1.gender,
            joinedDate:obj1.joinedDate,
            dateOfBirth:obj1.dateOfBirth,
            address1:obj1.address1,
            address2:obj1.address2,
            address3:obj1.address3,
            address4:obj1.address4,
            address5:obj1.address5,
            contactNumber:obj1.contactNumber,
            email:obj1.email,
            role:obj1.role,
            field:obj1.field,
            vehicle:obj1.vehicle,
            equipment:obj1.equipment,

        }
        $.ajax({
            type: "POST",
            url: "http://localhost:6060/api/v1/staff",
            headers:{"Authorization": "Bearer "+localStorage.getItem('jwtToken')},
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

    async updateStaff(obj1,staffId) {
        const data = {
            firstName: obj1.firstName,
            lastName: obj1.lastName,
            designation: obj1.designation,
            gender: obj1.gender,
            joinedDate:obj1.joinedDate,
            dateOfBirth:obj1.dateOfBirth,
            address1:obj1.address1,
            address2:obj1.address2,
            address3:obj1.address3,
            address4:obj1.address4,
            address5:obj1.address5,
            contactNumber:obj1.contactNumber,
            email:obj1.email,
            role:obj1.role,
            field:obj1.field,
            vehicles:obj1.vehicle,
            equipments:obj1.equipment,

        }
        $.ajax({
            type: "PATCH",
            url: `http://localhost:6060/api/v1/staff/${staffId}`,
            headers:{"Authorization": "Bearer "+localStorage.getItem('jwtToken')},
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


    async getStaff() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "http://localhost:6060/api/v1/staff",
                headers:{"Authorization": "Bearer "+localStorage.getItem('jwtToken')},
                dataType: "json", // Corrected dataType
                success: function (response) {
                    console.log("SUCCESS:", response);
                    resolve(response);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("AJAX Error:", {
                        status: jqXHR.status,
                        statusText: jqXHR.statusText,
                        responseText: jqXHR.responseText,
                        error: errorThrown
                    });
                    reject(jqXHR.responseText || errorThrown);
                }
            });
        });
    }
    async deleteStaff(staffId) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "DELETE",
                url: `http://localhost:6060/api/v1/staff/${staffId}`,
                headers:{"Authorization": "Bearer "+localStorage.getItem('jwtToken')},
                dataType: "json",
                success: function (response) {
                    console.log("SUCCESS : ", response);
                    resolve(response);
                },
                error: function (error) {
                    console.log("ERROR : ", error);
                    reject(error);
                },
            });
        });
    }

}