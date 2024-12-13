import { logArray } from "../db/db.js";

export class LogAPI {

    async saveLog(obj) {
        const data = new FormData();

        // Append log details
        data.append("logDetail", obj.logDetail || "");
        data.append("logDate", obj.logDate || "");

        // Append log image if available
        if (obj.logImage && obj.logImage !== "#") {
            const blob3 = this.dataURLToBlob3(obj.logImage);
            if (blob3) {
                data.append("logImage", blob3, "logImage.jpg");
            }
        }

        // Append JSON fields
        data.append("fields", new Blob([JSON.stringify(obj.fields || [])], { type: "application/json" }));
        data.append("staff", new Blob([JSON.stringify(obj.staff || [])], { type: "application/json" }));
        data.append("crop", new Blob([JSON.stringify(obj.crop || [])], { type: "application/json" }));

        // Disable the button during the operation
        $("#create-log-btn").prop("disabled", true);

        // Make POST request
        try {
            const response = await $.ajax({
                type: "POST",
                enctype: "multipart/form-data",
                url: "http://localhost:6060/api/v1/log",
                headers:{"Authorization": "Bearer "+localStorage.getItem('jwtToken')},
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
            });

            console.log("SUCCESS: ", response);
            logArray.push(response);
        } catch (error) {
            console.error("ERROR: ", error);
        } finally {
            $("#create-log-btn").prop("disabled", false);
        }
    }


    dataURLToBlob3(dataURL) {
        try {
            const arr = dataURL.split(",");
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        } catch (error) {
            console.error("Invalid Data URL:", dataURL, error);
            return null;
        }
    }


    async updateLog(obj,logCode) {
        const data = new FormData();

        // Append log details
        data.append("logDetail", obj.logDetail || "");
        data.append("logDate", obj.logDate || "");
        // Append log image if available
        if (obj.logImage && obj.logImage !== "#") {
            const blob3 = this.dataURLToBlob3(obj.logImage);
            if (blob3) {
                data.append("logImage", blob3, "logImage.jpg");
            }
        }
        // Append JSON fields
        data.append("fields", new Blob([JSON.stringify(obj.fields || [])], { type: "application/json" }));
        data.append("staff", new Blob([JSON.stringify(obj.staff || [])], { type: "application/json" }));
        data.append("crop", new Blob([JSON.stringify(obj.crop || [])], { type: "application/json" }));



        // Disable the button during the operation
        $("#create-log-btn").prop("disabled", true);
        console.log("Update log code",obj.logCode);
        // Make PATCH request
        try {
            const response = await $.ajax({
                type: "PATCH",
                enctype: "multipart/form-data",
                url: `http://localhost:6060/api/v1/log/${logCode}`,
                headers:{"Authorization": "Bearer "+localStorage.getItem('jwtToken')},
                data: data,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
            });

            console.log("SUCCESS: ", response);
            logArray.push(response);
        } catch (error) {
            console.error("ERROR: ", error);
        } finally {
            $("#create-log-btn").prop("disabled", false);
        }
    }


    async getLog() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "http://localhost:6060/api/v1/log",
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

    async deleteLog(logCode) {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "DELETE",
                url: `http://localhost:6060/api/v1/log/${logCode}`,
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
