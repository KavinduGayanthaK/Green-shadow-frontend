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
            },
            error: function (error) {
                console.log("ERROR : ", error);
                // Enable the submit button
                $("#create-crop-btn").prop("disabled", false);
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
            },
            error: function (error) {
                console.log("ERROR : ", error);
                // Enable the submit button
                $("#create-crop-btn").prop("disabled", false);
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
                },
                error: function (error) {
                    console.log("ERROR : ", error);
                    reject(error);
                },
            });
        });
    }


}
