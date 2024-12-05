import {fieldArray} from "../db/db.js";

export class FieldAPI {
    async saveField(obj) {
        // Create a FormData object
        const data = new FormData();

        // Append text fields to FormData
        data.append("fieldName", obj.fieldName || "");
        data.append("fieldLocation", obj.location || "");
        data.append("extendSizeOfField", obj.extendSizeOfField || "");
        data.append(
            "fieldsCrop",
            new Blob([JSON.stringify(obj.crops)], { type: "application/json" }) || ""
        );
        data.append(
            "fieldsStaff",
            new Blob([JSON.stringify(obj.staff)], { type: "application/json" }) || ""
        );

        // Append images to FormData
        if (obj.image1 && obj.image1 !== "#") {
            const blob1 = this.dataURLToBlob(obj.image1);
            data.append("fieldImage1", blob1, "fieldImage1.jpg");
        }
        if (obj.image2 && obj.image2 !== "#") {
            const blob2 = this.dataURLToBlob(obj.image2);
            data.append("fieldImage2", blob2, "fieldImage2.jpg");
        }

        // Disable the submit button (if using jQuery)
        $("#create-field-btn").prop("disabled", true);

        // Make the AJAX call
        $.ajax({
            type: "POST",
            enctype: "multipart/form-data",
            url: "http://localhost:6060/api/v1/field",
            headers:{"Authorization": "Bearer "+localStorage.getItem('jwtToken')},
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (response) {
                console.log("SUCCESS : ", response);
                fieldArray.push(response);
                // Enable the submit button
                $("#create-field-btn").prop("disabled", false);
            },
            error: function (error) {
                console.log("ERROR : ", error);
                // Enable the submit button
                $("#create-field-btn").prop("disabled", false);
            },
        });
    }


    async updateField(obj,fieldCode) {
        // Create a FormData object
        const data = new FormData();

        // Append text fields to FormData
        data.append("fieldName", obj.fieldName || "");
        data.append("fieldLocation", obj.location || "");
        data.append("extendSizeOfField", obj.extendSizeOfField || "");
        data.append(
            "fieldsCrop",
            new Blob([JSON.stringify(obj.crops)], { type: "application/json" }) || ""
        );
        data.append(
            "fieldsStaff",
            new Blob([JSON.stringify(obj.staff)], { type: "application/json" }) || ""
        );

        // Append images to FormData
        if (obj.image1 && obj.image1 !== "#") {
            const blob1 = this.dataURLToBlob(obj.image1);
            data.append("fieldImage1", blob1, "fieldImage1.jpg");
        }
        if (obj.image2 && obj.image2 !== "#") {
            const blob2 = this.dataURLToBlob(obj.image2);
            data.append("fieldImage2", blob2, "fieldImage2.jpg");
        }

        // Disable the submit button (if using jQuery)
        $("#create-field-btn").prop("disabled", true);

        // Make the AJAX call
        $.ajax({
            type: "PATCH",
            enctype: "multipart/form-data",
            url: `http://localhost:6060/api/v1/field/${fieldCode}`,
            headers:{"Authorization": "Bearer "+localStorage.getItem('jwtToken')},
            data: data,
            processData: false,
            contentType: false,
            cache: false,
            timeout: 600000,
            success: function (response) {
                console.log("SUCCESS : ", response);
                fieldArray.push(response);
                // Enable the submit button
                $("#create-field-btn").prop("disabled", false);
            },
            error: function (error) {
                console.log("ERROR : ", error);
                // Enable the submit button
                $("#create-field-btn").prop("disabled", false);
            },
        });
    }


// Helper function to convert data URL to Blob
    dataURLToBlob(dataURL) {
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
    async getFields() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "http://localhost:6060/api/v1/field",
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

    async deleteField(fieldCode) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "DELETE",
                url: `http://localhost:6060/api/v1/field/${fieldCode}`,
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
