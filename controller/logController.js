import {fieldArray, cropArray, staffArray, logArray} from "../db/db.js";
import { LogModel } from "../model/logModel.js";
import {LogAPI} from "../api/logAPI.js";

let recordIndexLog;
let logFields = [];
let logCrops = [];
let logStaff = [];

let logAPI = new LogAPI();

$(document).ready(function () {
    loadLog();

    $("#log-fieldSearch").on("input", function () {
        const query = $(this).val().toLowerCase();
        $("#autocomplete-logFields").empty();

        const suggestions = fieldArray.filter(field => field.fieldCode.toLowerCase().includes(query));
        suggestions.forEach(field => {
            $("#autocomplete-logFields").append(`<div class="autocomplete-suggestion-logField">${field.fieldCode}</div>`);
        });

        if (suggestions.length > 0) {
            $("#autocomplete-logFields").show();
        } else {
            $("#autocomplete-logFields").hide();
        }
    });
    $("#log-cropSearch").on("input", function () {
        const query = $(this).val().toLowerCase();
        $("#autocomplete-logCrops").empty();

        const suggestions = cropArray.filter(crop => crop.cropCode.toLowerCase().includes(query));
        suggestions.forEach(crop => {
            $("#autocomplete-logCrops").append(`<div class="autocomplete-suggestion-logCrop">${crop.cropCode}</div>`);
        });

        if (suggestions.length > 0) {
            $("#autocomplete-logCrops").show();
        } else {
            $("#autocomplete-logCrops").hide();
        }
    });

    $("#log-staffSearch").on("input", function () {
        const query = $(this).val().toLowerCase();
        $("#autocomplete-logStaffMember").empty();

        const suggestions = staffArray.filter(staff => staff.staffId.toLowerCase().includes(query));
        suggestions.forEach(staff => {
            $("#autocomplete-logStaffMember").append(`<div class="autocomplete-suggestion-logStaffMember">${staff.staffId}</div>`);
        });

        if (suggestions.length > 0) {
            $("#autocomplete-logStaffMember").show();
        } else {
            $("#autocomplete-logStaffMember").hide();
        }
    });

    $(document).on("click", ".autocomplete-suggestion-logField", function () {
        const logField = $(this).text();
        addLogFields(logField);
        $("#log-fieldSearch").val("");
        $("#autocomplete-logFields").hide();
    });

    $(document).on("click", ".autocomplete-suggestion-logCrop", function () {
        const logCrop = $(this).text();
        addLogCrops(logCrop);
        $("#log-cropSearch").val("");
        $("#autocomplete-logCrops").hide();
    });

    $(document).on("click", ".autocomplete-suggestion-logStaffMember", function () {
        const logStaff = $(this).text();
        addLogStaff(logStaff);
        $("#log-staffSearch").val("");
        $("#autocomplete-logStaffMember").hide();
    });


    $(document).on("click", function (e) {
        if (!$(e.target).closest('#log-fieldSearch, #autocomplete-logFields').length) {
            $("#autocomplete-logFields").hide();
        }
        if (!$(e.target).closest('#log-cropSearch, #autocomplete-logCrops').length) {
            $("#autocomplete-logCrops").hide();
        }
        if (!$(e.target).closest('#log-staffSearch, #autocomplete-logStaffMember').length) {
            $("#autocomplete-logStaffMember").hide();
        }
    });

    $(document).on("click", ".selected-item i", function () {
        const logField = $(this).closest(".selected-item");
        const logFields = logField.attr("data-logField");

        if (logFields) removeLogField(logFields);
    });
    $(document).on("click", ".selected-item i", function () {
        const logCrop = $(this).closest(".selected-item");
        const logCrops = logCrop.attr("data-logCrop");

        if (logCrops) removeLogCrop(logCrops);
    });
    $(document).on("click", ".selected-item i", function () {
        const logStaff = $(this).closest(".selected-item");
        const logStaffs = logStaff.attr("data-logStaff");

        if (logStaffs) removeLogStaff(logStaffs);
    });
});

let selectedLogFields = [];
function addLogFields(logField) {
    if (!$("#log-selectedFields").find(`[data-logField="${logField}"]`).length) {
        selectedLogFields.push(logField);
        $("#log-selectedFields").append(`
            <span class="selected-item" data-cropField="${logField}">
               ${logField} <i class="bi bi-x-circle"></i>
            </span>
        `);
    }
}

let selectedLogCrops = [];
function addLogCrops(logCrops) {
    if (!$("#log-selectedCrops").find(`[data-logCrop="${logCrops}"]`).length) {
        selectedLogCrops.push(logCrops);
        $("#log-selectedCrops").append(`
            <span class="selected-item" data-logCrop="${logCrops}">
               ${logCrops} <i class="bi bi-x-circle"></i>
            </span>
        `);
    }
}

let selectedLogStaff = [];
function addLogStaff(logStaff) {
    if (!$("#log-selectedStaffSearch").find(`[data-logStaff="${logStaff}"]`).length) {
        selectedLogStaff.push(logStaff);
        $("#log-selectedStaffSearch").append(`
            <span class="selected-item" data-logStaff="${logStaff}">
               ${logStaff} <i class="bi bi-x-circle"></i>
            </span>
        `);
    }
}

function removeLogField(logField) {
    logField = $.trim(logField);
    $(`[data-logField="${logField}"]`).remove();
    selectedLogFields = selectedLogFields.filter(item => item !== logField);
}
function removeLogCrop(logCrop) {
    logCrop = $.trim(logCrop);
    $(`[data-logCrop="${logCrop}"]`).remove();
    selectedLogCrops = selectedLogCrops.filter(item => item !== logCrop);
}
function removeLogStaff(logStaff) {
    logStaff = $.trim(logStaff);
    $(`[data-logStaff="${logStaff}"]`).remove();
    selectedLogStaff = selectedLogStaff.filter(item => item !== logStaff);
}

$('#Image1-log').on('change', function () {
    previewImageLog('Image1-log', 'previewImage-log');
});

function previewImageLog(inputId, previewId) {
    const inputLog = $('#' + inputId)[0];
    const previewLog = $('#' + previewId);

    if (inputLog.files && inputLog.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewLog.attr('src', e.target.result);
            previewLog.removeClass('d-none');
        };

        reader.readAsDataURL(inputLog.files[0]);
    } else {
        previewLog.addClass('d-none').attr('src', '#');
    }
}

//save Crop
$('#create-log-btn').click(async function () {
    setLabel("CREATE LOG", "Add Log");
    let logCode;

    if ($('#create-log-btn').text() === "CREATE LOG") {
        logCode = generateLogCode();
    } else {
        logCode = logArray[recordIndexLog].logCode;
    }

    let logDetail = $('#log-detail').val();
    let logDate = $('#log-date').val();
    let logFields = selectedLogFields || [];
    let logCrops = selectedLogCrops || [];
    let logStaff = selectedLogStaff || [];
    let logImage = $('#previewImage-log').attr('src');

    // Check if logImage is valid
    if (!logImage || logImage === "#") {
        logImage = null;
    }

    const logObj = new LogModel(logCode, logDetail, logDate, logImage, logFields, logStaff, logCrops);

    try {
        if (recordIndexLog !== undefined) {
            // Update existing log
            await logAPI.updateLog(logObj, logArray[recordIndexLog].logCode);
            recordIndexLog = undefined;
        } else {
            // Save new log
            await logAPI.saveLog(logObj);
        }

        // Fetch updated logs from the server
        const updatedLogs = await logAPI.getLog();

        // Update the local array and refresh UI
        logArray.length = 0; // Clear current array
        logArray.push(...updatedLogs); // Push new data
        loadLogCards(); // Refresh the UI

        clearLogFields(); // Clear input fields
    } catch (error) {
        console.error("Error saving log:", error);
        alert("Failed to save log. Please try again.");
    }
});


function setLabel(btnName = "CREATE LOG", labelName = "Add Log") {
    $('#create-log-btn').text(btnName);
    $('#logModalLabel').text(labelName);
}

function loadLogCards(index = null) {
    if (index !== null) {
        const log = logArray[index];
        const $cardLog = $(`#cardLog-${index}`);

        if ($cardLog.length) {
            $cardLog.find('.card-title').text("Log Details");
            $cardLog.find('.card-text:eq(0)').html(`<strong>Log Code:</strong> ${log.logCode}`);
            $cardLog.find('.card-text:eq(1)').html(`<strong>Log Details:</strong> ${log.logDetail}`);
            $cardLog.find('.card-text:eq(2)').html(`<strong>Log Data:</strong> ${log.logDate}`);
            $cardLog.find('.card-text:eq(3)').html(`<strong>Log Fields:</strong> ${log.fields.join(', ')}`);
            $cardLog.find('.card-text:eq(4)').html(`<strong>Log Crops:</strong> ${log.crop.join(', ')}`);
            $cardLog.find('.card-text:eq(5)').html(`<strong>Log Staff:</strong> ${log.staff.join(', ')}`);
            $cardLog.find('.carousel-item:eq(0) img').attr('src', log.logImage);
        }
    } else {
        $("#logCardSection").empty();
        logArray.forEach((log, idx) => {
            const cardHTML = `
                <div id="cardLog-${idx}" class="card text-white" style="background-color: #2b2b2b; border: 1px solid gray;">
                    <div id="carousel${idx}" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="${convertImage(log.logImage)}" class="d-block w-100 fixed-image" height="175px" alt="Log Image">
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Log Details</h5>
                        <p class="card-text"><strong>Log Code:</strong> ${log.logCode}</p>
                        <p class="card-text"><strong>Log Details:</strong> ${log.logDetail}</p>
                        <p class="card-text"><strong>Log Data:</strong> ${log.logDate}</p>
                        <p class="card-text"><strong>Log Fields:</strong>  ${log.fields.join(', ')}</p>
                        <p class="card-text"><strong>Log Crops:</strong> ${log.crop}</p>
                        <p class="card-text"><strong>Log Staff:</strong> ${log.staff}</p>
                        <div class="d-flex justify-content-between">
                            <button class="btnLogUpdate btn btn-success flex-grow-1 me-2" data-index="${idx}" data-bs-toggle="modal" data-bs-target="#add-log-modal">Update</button>
                            <button class="btnLogDelete btn btn-danger flex-grow-1" data-index="${idx}">Delete</button>
                        </div>
                    </div>
                </div>`;
            $("#logCardSection").append(cardHTML);
        });
    }
}

$(document).on("click", ".btnLogUpdate", function () {
    setLabel("UPDATE LOG", "Update Log");
    recordIndexLog = $(this).data("index");
    const log = logArray[recordIndexLog];

    $('#log-detail').val(log.logDetail);
    $('#log-date').val(log.logDate);
    $('#previewImage-log').attr('src', log.logImage);

    selectedLogFields = [];
    selectedLogCrops = [];
    selectedLogStaff = [];
    $('#log-selectedFields').empty();
    $('#log-selectedCrops').empty();
    $('#log-selectedStaffSearch').empty();
    log.fields.forEach(logFields => addLogFields(logFields.trim()));
    log.crop.forEach(logCrops => addLogCrops(logCrops.trim()));
    log.staff.forEach(logStaff => addLogStaff(logStaff.trim()));
});

$(document).on("click", ".btnLogDelete", async function () {
    const index = $(this).data("index");
    const logCode = logArray[index].logCode;

    await logAPI.deleteLog(logCode);
    const updatedLogs = await logAPI.getLog();
    logArray.length = 0;
    logArray.push(...updatedLogs);
    loadLogCards();
});

$('#clear-log-btn').on('click', clearLogFields);

function clearLogFields() {
    $('#log-detail, #log-date,#Image1-log').val("");
    $('#previewImage-log').addClass('d-none').attr('src', '#');
    selectedLogFields = [];
    selectedLogCrops = [];
    selectedLogStaff = [];
    $('#log-selectedFields').empty();
    $('#log-selectedCrops').empty();
    $('#log-selectedStaffSearch').empty();
}

function generateLogCode() {
    const usedCodes = logArray.map(log => log.logCode);
    let newCode = `CROP-${(logArray.length + 1).toString().padStart(3, '0')}`;
    while (usedCodes.includes(newCode)) {
        newCode = `CROP-${(parseInt(newCode.split('-')[1]) + 1).toString().padStart(3, '0')}`;
    }
    return newCode;
}

async function loadLog() {
    try {
        const logs = await logAPI.getLog();
        logArray.push(...logs); // Spread operator adds all fields to fieldArray
        console.log("Loaded Staff:", staffArray); // Directly log the array
        loadLogCards(); // Update the UI or perform further actions
    } catch (error) {
        console.error("Error loading staff:", error); // Use console.error for errors
    }
}

function convertImage(base64Image) {
    const base64String = base64Image;
    const mimeType = "image/jpeg";
    return `data:${mimeType};base64,${base64String}`;
}

$("#logSorting").on('change', async () => {
    await loadCardSorting($("#logSorting").val());
})