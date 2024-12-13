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
                Swal.fire({
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            error: function (error) {
                console.log("ERROR : ", error);
                $("#create-employee-btn").prop("disabled", false);
                switch (xhr.status) {
                    case 400:
                        Swal.fire("Bad Request", "The request was invalid. Please check your input and try again.", "error");
                        break;
                    case 401:
                        Swal.fire("Unauthorized", "You are not authorized to perform this action.", "warning");
                        break;
                    case 403:
                        Swal.fire("Forbidden", "You do not have permission to access this resource.", "error");
                        break;
                    case 404:
                        Swal.fire("Not Found", "The requested resource could not be found.", "info");
                        break;
                    case 500:
                        Swal.fire("Server Error", "An error occurred on the server. Please try again later.", "error");
                        break;
                    default:
                        Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
                        break;
                }
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
                Swal.fire({
                    icon: "success",
                    title: "Your work has been Updated!",
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            error: function (error) {
                console.log("ERROR : ", error);
                $("#create-employee-btn").prop("disabled", false);

                    switch (xhr.status) {
                        case 400:
                            Swal.fire("Bad Request", "The request was invalid. Please check your input and try again.", "error");
                            break;
                        case 401:
                            Swal.fire("Unauthorized", "You are not authorized to perform this action.", "warning");
                            break;
                        case 403:
                            Swal.fire("Forbidden", "You do not have permission to access this resource.", "error");
                            break;
                        case 404:
                            Swal.fire("Not Found", "The requested resource could not be found.", "info");
                            break;
                        case 500:
                            Swal.fire("Server Error", "An error occurred on the server. Please try again later.", "error");
                            break;
                        default:
                            Swal.fire("Error", "An unexpected error occurred. Please try again.", "error");
                            break;
                    }
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