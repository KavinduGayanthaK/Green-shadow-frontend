import { staffArray, vehicleArray } from "../db/db.js";
import { VehicleModel } from "../model/VehicleModel.js";
import {VehicleAPI} from "../api/vehicleAPI.js";

let vehicleRecordIndex = null;

let vehicleAPI = new VehicleAPI();
$(document).ready(function () {

    loadVehicle();
    // Filter suggestions based on staff name instead of staffId
    $("#vehicle-staffSearch").on("input", function () {
        const query = $(this).val().toLowerCase();
        $("#autocomplete-vehicleStaffMember").empty();

        // Filter suggestions by staff name
        const suggestions = staffArray.filter(staff => staff.staffId.toLowerCase().includes(query));
        suggestions.forEach(staff => {
            $("#autocomplete-vehicleStaffMember").append(`<div class="autocomplete-suggestion-vehicleStaffMember">${staff.staffId}</div>`);
        });

        if (suggestions.length > 0) {
            $("#autocomplete-vehicleStaffMember").show();
        } else {
            $("#autocomplete-vehicleStaffMember").hide();
        }
    });

    // Handle selection of staff name from suggestions
    $(document).on("click", ".autocomplete-suggestion-vehicleStaffMember", function () {
        const vehicleStaffName = $(this).text();
        addVehicleStaffMember(vehicleStaffName);
        $("#vehicle-staffSearch").val("");
        $("#autocomplete-vehicleStaffMember").hide();
    });

    // Hide suggestions when clicking outside the search box
    $(document).on("click", function (e) {
        if (!$(e.target).closest('#vehicle-staffSearch, #autocomplete-vehicleStaffMember').length) {
            $("#autocomplete-vehicleStaffMember").hide();
        }
    });

    // Remove selected staff member
    $(document).on("click", ".selected-item i", function () {
        const vehicleStaffName = $(this).closest(".selected-item").attr("data-vehicleStaff");
        if (vehicleStaffName) removeVehicleStaffMember(vehicleStaffName);
    });
});

let selectedVehicleStaffMember = null; // Holds only one staff member

// Add selected staff member to the list
function addVehicleStaffMember(vehicleStaffName) {
    // Check if a staff member is already assigned to the vehicle
    if (!selectedVehicleStaffMember) {
        selectedVehicleStaffMember = vehicleStaffName;
        $("#vehicle-selectedStaffSearch").append(
            `<span class="selected-item" data-vehicleStaff="${vehicleStaffName}">
               ${vehicleStaffName} <i class="bi bi-x-circle"></i>
            </span>`
        );
    } else {
        alert("Only one staff member can be assigned to this vehicle.");
    }
}

// Remove staff member from selected list
function removeVehicleStaffMember(vehicleStaffName) {
    $(`[data-vehicleStaff="${vehicleStaffName}"]`).remove();
    selectedVehicleStaffMember = null; // Clear the selected staff member
}

// Save and create vehicle
$('#create-vehicle-btn').on('click', (event) => {
    event.preventDefault();
    setVehicleModalLabel('CREATE VEHICLE', "Add Vehicle");

    let licensePlateNumber = $('#vehicle-licensePlateNumber').val();
    let category = $('#vehicle-category').val();
    let fuelType = $('#vehicle-fuelType').val().toUpperCase();
    let vehicleStatus = $('#vehicle-status').val().toUpperCase();
    let allocatedStaffMember = selectedVehicleStaffMember;
    let specialRemark = $('#vehicle-specialRemark').val();

    const vehicleObj = new VehicleModel(licensePlateNumber, category, fuelType, vehicleStatus,specialRemark, allocatedStaffMember );

    if (vehicleRecordIndex !== null) {

        vehicleAPI.updateVehicle(vehicleObj,vehicleArray[vehicleRecordIndex].licensePlateNumber);
        loadVehicleTable();
        vehicleRecordIndex = null;
    } else {
        // Add new vehicle
        vehicleAPI.saveVehicle(vehicleObj)
        staffArray = [];
       loadVehicle();
    }
    clearVehicleModalFields();
});

function setVehicleModalLabel(btnName, modalLabel) {
    $('#create-vehicle-btn').text(btnName);
    $('#vehicleModalLabel').text(modalLabel);
}

$('#clear-vehicle-btn').on('click', () => {
    clearVehicleModalFields();
    setVehicleModalLabel('CREATE VEHICLE', "Add Vehicle");
});

function clearVehicleModalFields() {
    $('#vehicle-licensePlateNumber').val("");
    $('#vehicle-category').val("");
    $('#vehicle-fuelType').val("");
    $('#vehicle-status').val("");
    $('#vehicle-specialRemark').val("");
    selectedVehicleStaffMember = null;
    $('#vehicle-selectedStaffSearch').empty();
}

$('#vehicle-table-body').on('click', '#vehicle-update-btn', function () {
    setVehicleModalLabel("UPDATE VEHICLE", "Update Vehicle");

    vehicleRecordIndex = $(this).closest('tr').index();
    const vehicle = vehicleArray[vehicleRecordIndex];

    // Populate the form fields with vehicle data
    $('#vehicle-licensePlateNumber').val(vehicle.licensePlateNumber);
    $('#vehicle-category').val(vehicle.category);
    $('#vehicle-fuelType').val(vehicle.fuelType);
    $('#vehicle-status').val(vehicle.status);
    $('#vehicle-specialRemark').val(vehicle.remarks);

    // Clear any previous selections
    clearSelections();
    if (vehicle.staff) {
        addVehicleStaffMember(vehicle.staff);
    }
});

$('#close-vehicle-btn').on('click', () => {
    setVehicleModalLabel('CREATE VEHICLE', "Add Vehicle");
    clearVehicleModalFields();
})
// Clear selected fields, vehicles, and equipment
function clearSelections() {
    $("#vehicle-selectedStaffSearch").empty();
    selectedVehicleStaffMember = null;
}

// Delete vehicle
$('#vehicle-table-body').on('click', '#vehicle-delete-btn', function () {
    const recordIndexItem = $(this).closest('tr').index();
    vehicleAPI.deleteVehicle(vehicleArray[recordIndexItem].licensePlateNumber);
    loadVehicleTable();
});

function loadVehicleTable() {
    $('#vehicle-table-body').empty();
    vehicleArray.forEach((vehicle, index) => {
        let record = `<tr>
            <td class="vehicle-licenseplate-value fs-6">${vehicle.licensePlateNumber}</td>
            <td class="vehicle-category-value fs-6">${vehicle.category}</td>
            <td class="vehicle-fuelType-value fs-6">${vehicle.fuelType}</td>
            <td class="vehicle-status-value fs-6">${vehicle.status}</td>
            <td class="vehicle-allocateMember-value fs-6">${vehicle.staff}</td>
            <td class="vehicle-specialRemarks-value fs-6">${vehicle.remarks}</td>
            <td>
                <button id="vehicle-update-btn" data-bs-toggle="modal" data-bs-target="#add-vehicle-modal">
                    <i class="fa-solid fa-pen" style="color: #1fad14;"></i>
                </button>
                <button id="vehicle-delete-btn"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>`;

        $('#vehicle-table-body').append(record); // Append each row to the table
    });
}

async function loadVehicle() {
    try {
        const vehicle = await vehicleAPI.getVehicle();
        vehicleArray.push(...vehicle); // Spread operator adds all fields to fieldArray
        console.log("Loaded vehicle:", vehicleArray); // Directly log the array
        loadVehicleTable(); // Update the UI or perform further actions
    } catch (error) {
        console.error("Error loading vehicle:", error); // Use console.error for errors
    }
}
