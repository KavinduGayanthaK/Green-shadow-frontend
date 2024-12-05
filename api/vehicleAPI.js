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
            },
            error: function (error) {
                console.log("ERROR : ", error);
                $("#create-vehicle-btn").prop("disabled", false);
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
            },
            error: function (error) {
                console.log("ERROR : ", error);
                $("#create-vehicle-btn").prop("disabled", false);
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
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("AJAX Error:", {
                        status: jqXHR.status,
                        statusText: jqXHR.statusText,
                        responseText: jqXHR.responseText,
                        error: errorThrown,
                    });
                    reject(jqXHR.responseText || errorThrown);
                },
            });
        });
    }

}