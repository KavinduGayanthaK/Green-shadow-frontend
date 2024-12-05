import {cropArray, fieldArray, staffArray} from "../db/db.js";
import {FieldModel} from "../model/fieldModel.js";
import {FieldAPI} from "../api/fieldAPI.js";

let FieldApi = new FieldAPI();


let fieldsCrop = [];
let fieldsStaff = [];
let fieldsEquipment = []
let recordIndex;
let fieldCode =generateFieldCode();
let fields = []
$(document).ready(function () {

    loadFields();
    // Show crop suggestions
    $("#field-cropsSearch").on("input", function () {
        const query = $(this).val().toLowerCase();
        $("#autocomplete-fieldCrop").empty();

        const suggestions = cropArray.filter(crop => crop.cropCode.toLowerCase().includes(query));
        suggestions.forEach(crop => {
            $("#autocomplete-fieldCrop").append(`<div class="autocomplete-suggestion-fieldCrop">${crop.cropCode}</div>`);
        });
        if (suggestions.length>0) {
            $("#autocomplete-fieldCrop").show();
        } else {
            $("#autocomplete-fieldCrop").hide();
        }

    });

    // Show staff suggestions
    $('#field-staffSearch').on('input', function () {
        const query = $(this).val().toLowerCase();
        $('#autocomplete-fieldStaff').empty();

        const suggestions = staffArray.filter(staff => staff.staffId.toLowerCase().includes(query));
        suggestions.forEach(staff => {
            $("#autocomplete-fieldStaff").append(`<div class="autocomplete-suggestion-fieldStaff">${staff.staffId}</div>`);
        });

        $('#autocomplete-fieldStaff').show();
    });

    // Add crop on click from suggestions
    $(document).on("click", ".autocomplete-suggestion-fieldCrop", function () {
        const crop = $(this).text();
        addCrop(crop);
        $("#field-cropsSearch").val("");
        $("#autocomplete-fieldCrop").hide();
    });

    // Add staff on click from suggestions
    $(document).on("click", ".autocomplete-suggestion-fieldStaff", function () {
        const staff = $(this).text();
        addStaff(staff);
        $("#field-staffSearch").val("");
        $("#autocomplete-fieldStaff").hide();
    });


    // Hide suggestions if clicked outside
    $(document).on("click", function (e) {
        if (!$(e.target).closest('#field-cropsSearch, #autocomplete-fieldCrop').length) {
            $("#autocomplete-fieldCrop").hide();
        }
        if (!$(e.target).closest('#field-staffSearch, #autocomplete-fieldStaff').length) {
            $("#autocomplete-fieldStaff").hide();
        }
    });

    // Event delegation to remove items
    $(document).on("click", ".selected-item i", function () {
        const parent = $(this).closest(".selected-item");
        const crop = parent.attr("data-crop");
        const staff = parent.attr("data-staff");

        if (crop) removeCrop(crop);
        if (staff) removeStaff(staff);
    });
});

// Add crop
let selectedFieldCrop = [];
function addCrop(crop) {
    if (!$("#selectedFieldsCrop").find(`[data-crop="${crop}"]`).length) {
        selectedFieldCrop.push(crop);
        $("#selectedFieldsCrop").append(`
            <span class="selected-item" data-crop="${crop}">
               ${crop} <i class="bi bi-x-circle"></i>
            </span>
        `);
    }
}

// Add staff
let selectedFieldStaff = [];
function addStaff(staff) {
    if (!$('#selectedFieldsStaff').find(`[data-staff="${staff}"]`).length) {
        selectedFieldStaff.push(staff);
        $('#selectedFieldsStaff').append(`
            <span class="selected-item" data-staff="${staff}">
                ${staff} <i class="bi bi-x-circle"></i>
            </span>
        `);
    }
}

// Remove crop
function removeCrop(crop) {
    crop = $.trim(crop);
    $(`[data-crop="${crop}"]`).remove();
    selectedFieldCrop = selectedFieldCrop.filter(item => item !== crop);
}

// Remove staff
function removeStaff(staff) {
    staff = $.trim(staff);
    $(`[data-staff="${staff}"]`).remove();
    selectedFieldStaff = selectedFieldStaff.filter(item => item !== staff);
}

//show image in modal when file input changes
$('#fieldImage1').on('change', function () {
    previewImage('fieldImage1', 'preview1');
});
$('#fieldImage2').on('change', function () {
    previewImage('fieldImage2', 'preview2');
});

function previewImage(inputId, previewId) {
    const input = $('#' + inputId)[0];
    const preview = $('#' + previewId);

    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            preview.attr('src', e.target.result);
            preview.removeClass('d-none');
        };

        reader.readAsDataURL(input.files[0]);
    } else {
        preview.addClass('d-none').attr('src', '#');
    }
}

//save fields
$('#create-field-btn').on('click', (event) => {
    event.preventDefault();
    setLabel("CREATE FIELD","Add Field");
    let fieldId;

    // Generate new field code only when creating a new field
    if ($('#create-field-btn').text() === "CREATE FIELD") {
        fieldId = generateFieldCode();  // Generate field code only for new fields
    } else {
        fieldId = fieldCode;  // Use existing fieldCode when updating an existing field
    }

    let fieldName = $('#field-name').val();
    let fieldLocation = $('#field-location').val();
    let extentSizeOfTheField = $('#field-extentSizeOfTheField').val();
    fieldsCrop = selectedFieldCrop;
    fieldsStaff = selectedFieldStaff;
    let fieldImage1 = $('#preview1').attr('src');

    let fieldImage2 = $('#preview2').attr('src');


    clearFields();
    const fieldModel = new FieldModel(fieldId, fieldName, fieldLocation, extentSizeOfTheField, fieldsCrop, fieldsStaff, fieldImage1, fieldImage2);

    if (recordIndex !== undefined) {
      //update fields
        FieldApi.updateField(fieldModel,fieldArray[recordIndex].fieldCode)

    } else {
        // Add new field
        //fieldArray.push(fieldModel);
        FieldApi.saveField(fieldModel);
       // console.log(fieldId)
    }

    loadCards();
    $('#add-field-modal').modal('hide');
});

function setLabel(btnName,modalName) {
    $('#create-field-btn').text(btnName);
    $('#fieldModalLabel').text(modalName);
}

//clear fields
$('#clear-field-btn').on('click', function () {
   clearFields();
});

function clearFields() {
    // Clear input fields
    $('#field-name').val("");
    $('#field-location').val("");
    $('#field-extentSizeOfTheField').val("");
    $('#fieldImage1').val("");
    $('#fieldImage2').val("");
    $('#field-cropsSearch').val("");
    $('#field-staffSearch').val("");
    $('#equipmentSearch').val("");

    // Clear selected crop, staff, and equipment arrays
    selectedFieldCrop = [];
    selectedFieldStaff = [];

    // Clear the displayed selected items
    $('#selectedFieldsCrop').empty();   // Clears selected crops
    $('#selectedFieldsStaff').empty();  // Clears selected staff

    // Clear previews
    $('#preview1').addClass('d-none').attr('src', '#');
    $('#preview2').addClass('d-none').attr('src', '#');
}

function loadCards(index = null) {
    if (index !== null) {
        const field = fieldArray[index];
        const $card = $(`#card-${index}`);

        // Update card content without recreating it
        $card.find('.card-title').text("Field Details");
        $card.find('.card-text:eq(0)').html(`<strong>Field Code:</strong> ${field.fieldCode}`);
        $card.find('.card-text:eq(1)').html(`<strong>Name:</strong> ${field.fieldName}`);
        $card.find('.card-text:eq(2)').html(`<strong>Location:</strong> ${field.location}`);
        $card.find('.card-text:eq(3)').html(`<strong>Extent Size:</strong> ${field.extendSizeOfField}`);
        $card.find('.card-text:eq(4)').html(`<strong>Crop:</strong> ${field.crops}`);
        $card.find('.card-text:eq(5)').html(`<strong>Staff:</strong> ${field.staff}`);


        // Update carousel images if changed
        $card.find('.carousel-item:eq(0) img').attr('src', field.image1);
        $card.find('.carousel-item:eq(1) img').attr('src', field.image2);

    } else {
        // Clear all cards and reload them (initial load or full refresh)
        $("#fieldCardSection").empty();
        fieldArray.forEach((field, idx) => {
            const cardHTML = `
                <div id="card-${idx}" class="card text-white" style="background-color: #2b2b2b; border: 1px solid gray;">
                    <div id="carousel${idx}" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="${convertImage(field.image1)}" class="d-block w-100 fixed-image" height="175px" alt="Field Image 1">
                            </div>
                            <div class="carousel-item">
                                <img src="${convertImage(field.image2)}" class="d-block w-100 fixed-image" height="175px" alt="Field Image 2">
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carousel${idx}" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carousel${idx}" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Field Details</h5>
                        <p class="card-text"><strong>Field Code:</strong> ${field.fieldCode}</p>
                        <p class="card-text"><strong>Name:</strong> ${field.fieldName}</p>
                        <p class="card-text"><strong>Location:</strong> ${field.location.x},${field.location.y}</p>
                        <p class="card-text"><strong>Extent Size:</strong> ${field.extendSizeOfField}</p>
                        <p class="card-text"><strong>Crop:</strong> ${field.crops}</p>
                        <p class="card-text"><strong>Staff:</strong> ${field.staff}</p>
               
                        <div class="d-flex justify-content-between">
                            <button class="btnFieldUpdate btn btn-success flex-grow-1 me-2" data-index="${idx}" data-bs-toggle="modal" data-bs-target="#add-field-modal">Update</button>
                            <button class="btnFieldDelete btn btn-danger flex-grow-1" data-index="${idx}">Delete</button>
                        </div>
                    </div>
                </div>`;
            $("#fieldCardSection").append(cardHTML);
        });
    }
}

// Use event delegation for the update button
$(document).on('click', '.btnFieldUpdate', function () {
    recordIndex = $(this).data('index'); // Set recordIndex for the field to update

    const field = fieldArray[recordIndex];
    console.log("Upfate fadsad : ",field);
    setLabel("UPDATE FIELD", "Update Field");

    // Populate form fields with the selected field's data
    $('#field-name').val(field.fieldName);
    $('#field-location').val(field.location.x,field.location.y);
    $('#field-extentSizeOfTheField').val(field.extendSizeOfField);
    let imageData1 = `data:image/jpeg;base64,${field.image1}`;
    let imageData2 = `data:image/jpeg;base64,${field.image2}`;
    $('#preview1').attr('src', imageData1).removeClass('d-none');
    $('#preview2').attr('src', imageData2).removeClass('d-none');

    // Clear and reload crop, staff, and equipment data
    selectedFieldCrop = [];
    selectedFieldStaff = [];

    $('#selectedFieldsCrop').empty();
    $('#selectedFieldsStaff').empty();


    let cropArray = Array.isArray(field.crops) ? field.crops : field.crops.split(",");
    let staffArray = Array.isArray(field.crops) ? field.staff : field.staff.split(",");

    cropArray.forEach(crop => addCrop(crop.trim()));
    staffArray.forEach(staff => addStaff(staff.trim()));

});


$(document).on('click', '.btnFieldDelete', function () {
    recordIndex = $(this).data('index'); // Set recordIndex for the field to update
    fieldArray.splice(recordIndex,1);
    loadCards();
});

function generateFieldCode() {
    const usedCodes = fieldArray.map(field => field.fieldCode);
    let newCode = `FIELD-${(fieldArray.length + 1).toString().padStart(3, '0')}`;
    // Check if the code is already used, and generate a new code
    while (usedCodes.includes(newCode)) {
        newCode = `FIELD-${(parseInt(newCode.split('-')[1]) + 1).toString().padStart(3, '0')}`;
    }

    return newCode;
}
async function loadFields() {
    try {
        const fields = await FieldApi.getFields();
        fieldArray.push(...fields); // Spread operator adds all fields to fieldArray
        console.log("Loaded Fields:", fieldArray); // Directly log the array
        loadCards(); // Update the UI or perform further actions
    } catch (error) {
        console.error("Error loading fields:", error); // Use console.error for errors
    }
}

function convertImage(base64Image) {
    const base64String = base64Image;
    const mimeType = "image/jpeg";
    return `data:${mimeType};base64,${base64String}`;
}



