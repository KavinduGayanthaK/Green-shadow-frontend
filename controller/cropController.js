import { fieldArray, cropArray } from "../db/db.js";
import { CropModel } from "../model/cropModel.js";
import {CropAPI} from "../api/cropAPI.js";

let cropFields = [];
let recordIndexCrop;
let cropApi = new CropAPI();
$(document).ready(function () {
    loadCrops();
    $("#crop-fields").on("input", function () {
        const query = $(this).val().toLowerCase();
        $("#autocomplete-cropField").empty();

        const suggestions = fieldArray.filter(field => field.fieldCode.toLowerCase().includes(query));
        suggestions.forEach(field => {
            $("#autocomplete-cropField").append(`<div class="autocomplete-suggestion-cropField">${field.fieldCode}</div>`);
        });

        $("#autocomplete-cropField").toggle(suggestions.length > 0);
    });

    $(document).on("click", ".autocomplete-suggestion-cropField", function () {
        const cropField = $(this).text();
        addCropFields(cropField);
        $("#crop-fields").val("");
        $("#autocomplete-cropField").hide();
    });

    $(document).on("click", function (e) {
        if (!$(e.target).closest('#crop-fields, #autocomplete-cropField').length) {
            $("#autocomplete-cropField").hide();
        }
    });

    $(document).on("click", ".selected-item i", function () {
        const parent = $(this).closest(".selected-item");
        const cropField = parent.attr("data-cropField");
        if (cropField) removeCropFields(cropField);
    });
});

let selectedCropFields = [];

function addCropFields(cropField) {
    if (!$("#selectedCropField").find(`[data-cropField="${cropField}"]`).length) {
        selectedCropFields.push(cropField);
        $("#selectedCropField").append(`
            <span class="selected-item" data-cropField="${cropField}">
               ${cropField} <i class="bi bi-x-circle"></i>
            </span>
        `);
    }
}

function removeCropFields(cropField) {
    cropField = $.trim(cropField);
    console.log("Removing cropField:", cropField);
    $(`[data-cropField="${cropField}"]`).remove();
    selectedCropFields = selectedCropFields.filter(item => item !== cropField);
}

$('#cropImage1').on('change', function () {
    previewImageCrop('cropImage1', 'previewCropImage');
});

function previewImageCrop(inputId, previewId) {
    const inputCrop = $('#' + inputId)[0];
    const previewCrop = $('#' + previewId);

    if (inputCrop.files && inputCrop.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            previewCrop.attr('src', e.target.result).removeClass('d-none');
        };

        reader.readAsDataURL(inputCrop.files[0]);
    } else {
        previewCrop.addClass('d-none').attr('src', '#');
    }
}

// Save Crop
$('#create-crop-btn').click(async function () {
    setLabel("CREATE CROP", "Add Crop");
    let cropCode;

    if ($('#create-crop-btn').text() === "CREATE CROP") {
        cropCode = generateCropCode();
    } else {
        cropCode = cropArray[recordIndexCrop].cropCode;
    }

    const cropCommonName = $('#crop-commonName').val();
    const cropScientificName = $('#crop-scientificName').val();
    const cropCategory = $('#crop-category').val();
    const cropSeason = $('#crop-season').val();
    cropFields = [...selectedCropFields];
    const cropImage = $('#previewCropImage').attr('src');

    const cropObj = new CropModel(cropCode,cropCommonName, cropScientificName, cropCategory, cropSeason, cropFields, cropImage);

    if (recordIndexCrop !== undefined) {
        await cropApi.updateCrop(cropObj,cropArray[recordIndexCrop].cropCode);
        recordIndexCrop = undefined;
    } else {
        //cropArray.push(cropObj);
        await cropApi.saveCrop(cropObj);
    }

    await loadCrops();
    clearCropFields();
});

function setLabel(btnName = "CREATE CROP", labelName = "Add Crop") {
    $('#create-crop-btn').text(btnName);
    $('#cropModalLabel').text(labelName);
}

function loadCropCards(index = null) {
    if (index !== null) {
        const crop = cropArray[index];
        const $cardCrop = $(`#cardCrop-${index}`);

        if ($cardCrop.length) {
            $cardCrop.find('.card-title').text("Crop Details");
            $cardCrop.find('.card-text:eq(0)').html(`<strong>Crop Code:</strong> ${crop.cropCode}`);
            $cardCrop.find('.card-text:eq(1)').html(`<strong>Common Name:</strong> ${crop.commonName}`);
            $cardCrop.find('.card-text:eq(2)').html(`<strong>Scientific Name:</strong> ${crop.scientificName}`);
            $cardCrop.find('.card-text:eq(3)').html(`<strong>Category:</strong> ${crop.cropCategory}`);
            $cardCrop.find('.card-text:eq(4)').html(`<strong>Season:</strong> ${crop.cropSeason}`);
            $cardCrop.find('.card-text:eq(5)').html(`<strong>Fields:</strong> ${crop.fields.join(', ')}`);
            $cardCrop.find('.carousel-item:eq(0) img').attr('src', crop.cropImage);
        }
    } else {
        $("#cropCardSection").empty();
        cropArray.forEach((crop, idx) => {
            const cardHTML = `
                <div id="cardCrop-${idx}" class="card text-white" style="background-color: #2b2b2b; border: 1px solid gray;">
                    <div id="carousel${idx}" class="carousel slide" data-bs-ride="carousel">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="${convertImage(crop.cropImage)}" class="d-block w-100 fixed-image" height="175px" alt="Crop Image">
                            </div>
                        </div>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Crop Details</h5>
                        <p class="card-text"><strong>Crop Code:</strong> ${crop.cropCode}</p>
                        <p class="card-text"><strong>Common Name:</strong> ${crop.commonName}</p>
                        <p class="card-text"><strong>Scientific Name:</strong> ${crop.scientificName}</p>
                        <p class="card-text"><strong>Category:</strong> ${crop.cropCategory}</p>
                        <p class="card-text"><strong>Season:</strong> ${crop.cropSeason}</p>
                        <p class="card-text"><strong>Fields:</strong> ${crop.fields.join(', ')}</p>
                        <div class="d-flex justify-content-between">
                            <button class="btnCropUpdate btn btn-success flex-grow-1 me-2" data-index="${idx}" data-bs-toggle="modal" data-bs-target="#add-crop-modal">Update</button>
                            <button class="btnCropDelete btn btn-danger flex-grow-1" data-index="${idx}">Delete</button>
                        </div>
                    </div>
                </div>`;
            $("#cropCardSection").append(cardHTML);
        });
    }
}

$(document).on("click", ".btnCropUpdate", function () {
    setLabel("UPDATE CROP", "Update Crop");
    recordIndexCrop = $(this).data("index");
    const crop = cropArray[recordIndexCrop];

    $('#crop-commonName').val(crop.commonName);
    $('#crop-scientificName').val(crop.scientificName);
    $('#crop-category').val(crop.cropCategory);
    $('#crop-season').val(crop.cropSeason);
    let cropImage = `data:image/jpeg;base64,${crop.cropImage}`;
    $('#previewCropImage').attr('src', cropImage).removeClass('d-none');

    selectedCropFields = [];
    $('#selectedCropField').empty();
    crop.fields.forEach(fields => addCropFields(fields.trim()));
});

$(document).on("click", ".btnCropDelete", async function () {
    const index = $(this).data("index");
    const cropCode = cropArray[index].cropCode;

    await cropApi.deleteCrop(cropCode);
    await loadCrops();
});

$('#clear-crop-btn').on('click', clearCropFields);

function clearCropFields() {
    $('#crop-commonName, #crop-scientificName, #crop-category, #crop-season, #cropImage1').val("");
    $('#previewCropImage').addClass('d-none').attr('src', '#');
    selectedCropFields = [];
    $('#selectedCropField').empty();
}

function generateCropCode() {
    const usedCodes = cropArray.map(crop => crop.cropCode);
    let newCode = `CROP-${(cropArray.length + 1).toString().padStart(3, '0')}`;
    while (usedCodes.includes(newCode)) {
        newCode = `CROP-${(parseInt(newCode.split('-')[1]) + 1).toString().padStart(3, '0')}`;
    }
    return newCode;
}

async function loadCrops() {
    try {
        const crops = await cropApi.getCrops();
        cropArray.push(...crops);
        console.log("Loaded crops:", cropArray);
        loadCropCards();
    } catch (error) {
        console.error("Error loading crops:", error);
    }
}

function convertImage(base64Image) {
    const base64String = base64Image;
    const mimeType = "image/jpeg";
    return `data:${mimeType};base64,${base64String}`;
}