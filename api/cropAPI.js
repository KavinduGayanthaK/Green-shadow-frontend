import {cropArray} from "../db/db.js";

export class CropAPI {
    async saveCrop(obj) {
        // Create a FormData object
        const data = new FormData();

        // Append text fields to FormData
        data.append("commonName", obj.commonName || "");
        data.append("scientificName", obj.scientificName || "");
        data.append("cropCategory", obj.cropCategory || "");
        data.append("cropSeason", obj.cropSeason || "");
        data.append(
            "fields",
            new Blob([JSON.stringify(obj.fields)], { type: "application/json" }) || ""
        );

        if (obj.cropImage && obj.cropImage !== "#") {
            const blob2 = this.dataURLToBlob1(obj.cropImage);
            data.append("cropImage", blob2, "cropImage.jpg");
        }

        // Disable the submit button (if using jQuery)
        $("#create-crop-btn").prop("disabled", true);

        // Make the AJAX call
        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            url: "http://localhost:6060/api/v1/crop",
            headers:{"Authorization": "Bearer "+localStorage.getItem('jwtToken')},
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (response) {
                console.log("SUCCESS : ", response);
                cropArray.push(response);
                // Enable the submit button
                $("#create-crop-btn").prop("disabled", false);
                Swal.fire({
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            error: function (error) {
                console.log("ERROR : ", error);
                // Enable the submit button
                $("#create-crop-btn").prop("disabled", false);
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

// Helper function to convert data URL to Blob
    dataURLToBlob1(dataURL) {
        const arr = dataURL.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }

    async updateCrop(obj,cropCode) {
        // Create a FormData object
        const data = new FormData();

        // Append text fields to FormData
        data.append("commonName", obj.commonName || "");
        data.append("scientificName", obj.scientificName || "");
        data.append("cropCategory", obj.cropCategory || "");
        data.append("cropSeason", obj.cropSeason || "");
        data.append(
            "fields",
            new Blob([JSON.stringify(obj.fields)], { type: "application/json" }) || ""
        );

        if (obj.cropImage && obj.cropImage !== "#") {
            const blob2 = this.dataURLToBlob1(obj.cropImage);
            data.append("cropImage", blob2, "cropImage.jpg");
        }

        // Disable the submit button (if using jQuery)
        $("#create-crop-btn").prop("disabled", true);

        // Make the AJAX call
        $.ajax({
            type: "PATCH",
            enctype: "multipart/form-data",
            url: `http://localhost:6060/api/v1/crop/${cropCode}`,
            headers:{"Authorization": "Bearer "+localStorage.getItem('jwtToken')},
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (response) {
                console.log("SUCCESS : ", response);
                cropArray.push(response);
                // Enable the submit button
                $("#create-crop-btn").prop("disabled", false);
                Swal.fire({
                    icon: "success",
                    title: "Your work has been Updated!",
                    showConfirmButton: false,
                    timer: 1500
                });
            },
            error: function (error) {
                console.log("ERROR : ", error);
                // Enable the submit button
                $("#create-crop-btn").prop("disabled", false);
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

    async getCrops() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "http://localhost:6060/api/v1/crop",
                headers:{"Authorization": "Bearer "+localStorage.getItem('jwtToken')},
                dataType: "json",
                success: function (response) {
                    console.log("SUCCESS : ", response);
                    resolve(response);
                },
                error: function (error) {
                    console.log("ERROR : ", error);
                    reject(error);
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
                },
            });
        });
    }
    async deleteCrop(cropCode) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "DELETE",
                url: `http://localhost:6060/api/v1/crop/${cropCode}`,
                headers:{"Authorization": "Bearer "+localStorage.getItem('jwtToken')},
                dataType: "json",
                success: function (response) {
                    console.log("SUCCESS : ", response);
                    resolve(response);
                    Swal.fire({
                        icon: "success",
                        title: "Your Crop has been deleted!",
                        showConfirmButton: false,
                        timer: 1500
                    });
                },
                error: function (error) {
                    console.log("ERROR : ", error);
                    reject(error)
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
        });
    }


}
