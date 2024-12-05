import {equipmentArray, staffArray} from "../db/db.js";

export class EquipmentAPI {
    async saveEquipment(obj){
        const data  = {
            equipmentName : obj.equipmentName,
            type : obj.type,
            status: obj.status,
            totalCount:obj.totalCount,
            assignedCount :obj.assignedCount,
            fields : obj.fields,
            staff:obj.staff

        }
        console.log(obj.totalCount,obj.assignedCount)

        $.ajax({
            type: "POST",
            url: "http://localhost:6060/api/v1/equipment",
            data:  JSON.stringify(data),
            contentType: "application/json",
            headers:{"Authorization": "Bearer "+localStorage.getItem('jwtToken')},
            processData: true,
            cache: false,
            timeout: 600000,
            success: function (response) {
                console.log("SUCCESS : ", response);
                staffArray.push(response);
                $("#create-equipment-btn").prop("disabled", false);
            },
            error: function (error) {
                console.log("ERROR : ", error);
                $("#create-equipment-btn").prop("disabled", false);
            },
        });
    }

    async getEquipment() {
        return new Promise((resolve, reject) => {
            $.ajax({
                type: "GET",
                url: "http://localhost:6060/api/v1/equipment",
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
}