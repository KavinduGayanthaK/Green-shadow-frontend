import {vehicleArray} from "../db/db.js";

export class VehicleAPI {

    async saveVehicle(vehicle) {
        const data = {
            licensePlateNumber: vehicle.licensePlateNumber,
            category: vehicle.category,
            fuelType: vehicle.fuelType,
            status: vehicle.status,
            remarks: vehicle.remarks,
            staff: vehicle.staff
        }
        console.log(data)
        $.ajax({
            type: "POST",
            url: "http://localhost:6060/api/v1/vehicle",
            headers:{"Authorization": "Bearer "+localStorage.getItem('jwtToken')},
            data:  JSON.stringify(data),
            contentType: "application/json",
            cache: false,
            timeout: 600000,
            success: function (response) {
                console.log("SUCCESS : ", response);
                vehicleArray.push(response);
                $("#create-vehicle-btn").prop("disabled", false);
                Swal.fire({
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
                resolve();
            },
            error: function (error) {
                console.log("ERROR : ", error);
                $("#create-vehicle-btn").prop("disabled", false);
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
                reject(error);
            },
        });
    }

    async updateVehicle(vehicle,licensePlateNumber) {
        const data = {
            licensePlateNumber: vehicle.licensePlateNumber,
            category: vehicle.category,
            fuelType: vehicle.fuelType,
            status: vehicle.status,
            remarks: vehicle.remarks,
            staff: vehicle.staff
        }
        console.log(data)
        $.ajax({
            type: "POST",
            url: `http://localhost:6060/api/v1/vehicle/${licensePlateNumber}`,
            headers:{"Authorization": "Bearer "+localStorage.getItem('jwtToken')},
            data:  JSON.stringify(data),
            contentType: "application/json",
            cache: false,
            timeout: 600000,
            success: function (response) {
                console.log("SUCCESS : ", response);
                vehicleArray.push(response);
                $("#create-vehicle-btn").prop("disabled", false);
                Swal.fire({
                    icon: "success",
                    title: "Your work has been Updated!",
                    showConfirmButton: false,
                    timer: 1500
                });
                resolve();
            },
            error: function (error) {
                console.log("ERROR : ", error);
                $("#create-vehicle-btn").prop("disabled", false);
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
                reject(error);
            },
        });
    }

    async getVehicle() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "http://localhost:6060/api/v1/vehicle",
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
                    switch (xhr.status) {
                        case 400:
                            Swal.fire("Bad Request", "The request was invalid. Please check your input and try again.", "error");
                            break;
                        case 401:
                            Swal.fire("Unauthorized", "You are not authorized to perform this action.", "warning");
                            break;
                        case 403:
                            Swal.fire("Forbidden", "You do not have permission to access this resource.", "error");
                            Swal.fire({
                                title: "The Session expired?",
                                text: "You have to log again to system?",
                                icon: "question"
                            }).then(() => {
                                window.location.replace('index.html');
                                localStorage.removeItem("securityKey")
                                localStorage.removeItem("jwtToken")
                            });
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
                }
            });
        });
    }
    async deleteVehicle(licensePlateNumber) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "DELETE",
                url: `http://localhost:6060/api/v1/vehicle/${licensePlateNumber}`,
                headers:{"Authorization": "Bearer "+localStorage.getItem('jwtToken')},
                dataType: "json",
                success: function (response) {
                    console.log("SUCCESS:", response);
                    resolve(response);
                    Swal.fire({
                        icon: "success",
                        title: "Your Equipment has been deleted!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("AJAX Error:", {
                        status: jqXHR.status,
                        statusText: jqXHR.statusText,
                        responseText: jqXHR.responseText,
                        error: errorThrown,
                    });
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
                    reject(jqXHR.responseText || errorThrown);
                },
            });
        });
    }

}