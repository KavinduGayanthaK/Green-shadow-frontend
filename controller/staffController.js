import StaffModel from "../model/staffModel.js";
import {staffArray} from "../db/db.js";

let customerRecordIndex = undefined;

const fields = ["Rice Plate A", "Mix Palate A", "Cowpea Palate A"];
const vehicles = ["ABO-3456", "BAR-3739", "CAQ-5678"];
const equipment = ["Shovel, Available12", "Udalu,Available 10"];
let selectField = [];
let selectVehicle = [];
let selectEquipment = []
//suggestions fields
$(document).ready(function () {
    // Show suggestions based on input
    $("#staff-fieldSearch").on("input", function () {
        const query = $(this).val().toLowerCase();
        $("#autocomplete-staffFieldSearch").empty();

        // Filter crops based on input
        const suggestions = fields.filter(field => field.toLowerCase().includes(query));
        suggestions.forEach(field => {
            $("#autocomplete-staffFieldSearch").append(`<div class="autocomplete-suggestion-staffField">${field}</div>`);
        });

        // Show suggestions
        $("#autocomplete-staffFieldSearch").show();
    });

    $("#staff-vehicleSearch").on("input", function () {
        const query = $(this).val().toLowerCase();
        $("#autocomplete-staffVehicleSearch").empty();

        // Filter crops based on input
        const suggestions = vehicles.filter(vehicle => vehicle.toLowerCase().includes(query));
        suggestions.forEach(vehicle => {
            $("#autocomplete-staffVehicleSearch").append(`<div class="autocomplete-suggestion-staffVehicle">${vehicle}</div>`);
        });

        // Show suggestions
        $("#autocomplete-staffVehicleSearch").show();
    });

    $("#staff-equipmentSearch").on("input", function () {
        const query = $(this).val().toLowerCase();
        $("#autocomplete-staffEquipmentSearch").empty();

        // Filter crops based on input
        const suggestions = equipment.filter(vehicle => vehicle.toLowerCase().includes(query));
        suggestions.forEach(vehicle => {
            $("#autocomplete-staffEquipmentSearch").append(`<div class="autocomplete-suggestion-staffEquipment">${vehicle}</div>`);
        });

        // Show suggestions
        $("#autocomplete-staffEquipmentSearch").show();
    });
});

$(document).on("click", ".autocomplete-suggestion-staffField", function () {
    const staffField = $(this).text();
    addStaffField(staffField);
    $("#staff-fieldSearch").val("");
    $("#autocomplete-staffFieldSearch").hide();

});

$(document).on("click", ".autocomplete-suggestion-staffVehicle", function () {
    const staffVehicle = $(this).text();
    addStaffVehicle(staffVehicle);
    $("#staff-vehicleSearch").val("");
    $("#autocomplete-staffVehicleSearch").hide();

});

$(document).on("click", ".autocomplete-suggestion-staffEquipment", function () {
    const staffEquipment = $(this).text();
    addStaffEquipment(staffEquipment);
    $("#staff-equipmentSearch").val("");
    $("#autocomplete-staffEquipmentSearch").hide();

});
$(document).on("click", ".selected-item i", function () {
    const staffField = $(this).closest(".selected-item").attr("data-field");
    removeStaffField(staffField);

});
$(document).on("click", ".selected-item i", function () {
    const staffVehicle = $(this).closest(".selected-item").attr("data-vehicle");
    removeStaffVehicle(staffVehicle);


});
$(document).on("click", ".selected-item i", function () {
    const staffEquipment = $(this).closest(".selected-item").attr("data-equipment");
    removeStaffEquipment(staffEquipment);

});

// Hide suggestions if clicked outside
$(document).on("click", function (e) {
    if (!$(e.target).closest('#staff-fieldSearch', '#autocomplete-staffFieldSearch').length) {
        $("#autocomplete-staffFieldSearch").hide();
    }
    if (!$(e.target).closest('#staff-vehicleSearch', '#autocomplete-staffVehicleSearch').length) {
        $("#autocomplete-staffVehicleSearch").hide();
    }
    if (!$(e.target).closest('#staff-equipmentSearch', '#autocomplete-staffEquipmentSearch').length) {
        $("#autocomplete-staffEquipmentSearch").hide();
    }
});

let selectedStaffFields = [];

function addStaffField(staffField) {
    if (!$("#staff-selectedFieldsSearch").find(`[data-field="${staffField}"]`).length) {
        selectedStaffFields.push(staffField);
        $("#staff-selectedFieldsSearch").append(`
            <span class="selected-item" data-field="${staffField}">
               ${staffField} <i class="bi bi-x-circle" ></i>
            </span>
       `);
    }
}

let selectedStaffVehicle = [];

function addStaffVehicle(staffVehicle) {
    if (!$("#staff-selectedVehicleSearch").find(`[data-vehicle="${staffVehicle}"]`).length) {
        selectedStaffVehicle.push(staffVehicle);
        $("#staff-selectedVehicleSearch").append(`
            <span class="selected-item" data-vehicle="${staffVehicle}">
               ${staffVehicle} <i class="bi bi-x-circle" ></i>
            </span>
       `);
    }
}

let selectedStaffEquipment = [];

function addStaffEquipment(staffEquipment) {
    if (!$("#staff-selectedEquipmentSearch").find(`[data-equipment="${staffEquipment}"]`).length) {
        selectedStaffVehicle.push(staffEquipment);
        $("#staff-selectedEquipmentSearch").append(`
            <span class="selected-item" data-equipment="${staffEquipment}">
               ${staffEquipment} <i class="bi bi-x-circle" ></i>
            </span>
       `);
    }
}

// Remove crop from selected fields
function removeStaffField(staffField) {
    staffField = $.trim(staffField);
    $(`[data-field="${staffField}"]`).remove();
}

function removeStaffVehicle(staffVehicle) {
    staffVehicle = $.trim(staffVehicle);
    $(`[data-vehicle="${staffVehicle}"]`).remove();
}

function removeStaffEquipment(staffEquipment) {
    staffEquipment = $.trim(staffEquipment);
    $(`[data-equipment="${staffEquipment}"]`).remove();
}


//save staff

$('#create-employee-btn').on('click', () => {
    setLabel("CREATE EMPLOYEE","Add Employee");
    if ($('#create-employee-btn').text() === "CREATE EMPLOYEE") {
        let firstName = $('#staff-firstname').val();
        let lastName = $('#staff-lastname').val();
        let designation = $('#staff-designation').val();
        let gender = $('#staff-gender').val();
        let joinDate = $('#staff-joinDate').val();
        let dateOfBirth = $('#staff-DateOfBirth').val();
        let address1 = $('#staff-address1').val();
        let address2 = $('#staff-address2').val();
        let address3 = $('#staff-address3').val();
        let address4 = $('#staff-address4').val();
        let address5 = $('#staff-address5').val();
        let contactNumber = $('#staff-contactNumber').val();
        let email = $('#staff-email').val();
        let role = $('#staff-role').val();
        selectField = selectedStaffFields;
        selectVehicle = selectedStaffVehicle;
        selectEquipment = selectedStaffEquipment;
        clearFields();

        const staffDataObj = new StaffModel(firstName, lastName, designation, gender, joinDate, dateOfBirth, address1, address2, address3, address4, address5, contactNumber, email, role, selectField, selectVehicle, selectEquipment)

        staffArray.push(staffDataObj);
        loadStaffTable();

    }
    else {
        let firstName = $('#staff-firstname').val();
        let lastName = $('#staff-lastname').val();
        let designation = $('#staff-designation').val();
        let gender = $('#staff-gender').val();
        let joinDate = $('#staff-joinDate').val();
        let dateOfBirth = $('#staff-DateOfBirth').val();
        let address1 = $('#staff-address1').val();
        let address2 = $('#staff-address2').val();
        let address3 = $('#staff-address3').val();
        let address4 = $('#staff-address4').val();
        let address5 = $('#staff-address5').val();
        let contactNumber = $('#staff-contactNumber').val();
        let email = $('#staff-email').val();
        let role = $('#staff-role').val();
        selectField = selectedStaffFields;
        selectVehicle = selectedStaffVehicle;
        selectEquipment = selectedStaffEquipment;
        clearFields();

        const staffDataObj = new StaffModel(firstName, lastName, designation, gender, joinDate, dateOfBirth, address1, address2, address3, address4, address5, contactNumber, email, role, selectField, selectVehicle, selectEquipment)
        staffArray.push(staffDataObj);
        loadStaffTable();


    }
});

//update staff
$('#staff-table-body').on('click', '#staff-update-btn', function () {
    setLabel("UPDATE EMPLOYEE","Update Employee");

    customerRecordIndex = $(this).closest('tr').index();
    let id = $(this).closest('tr').find('.staff-id-value').text();
    let firstName = $(this).closest('tr').find('.staff-firstname-value').text();
    let lastName = $(this).closest('tr').find('.staff-lastname-value').text();
    let designation = $(this).closest('tr').find('.staff-designation-value').text();
    let gender = $(this).closest('tr').find('.staff-gender-value').text();
    let joinedDate = $(this).closest('tr').find('.staff-joinDate-value').text();
    let dateOfBirth = $(this).closest('tr').find('.staff-DateOfBirth-value').text();
    let addressValues = $(this).closest('tr').find('.staff-address1-value').text();
    let contactNumber = $(this).closest('tr').find('.staff-contactNumber-value').text();
    let email = $(this).closest('tr').find('.staff-email-value').text();
    let role = $(this).closest('tr').find('.staff-role-value').text();
    let field = $(this).closest('tr').find('.staff-fields-value').text();
    let vehicle = $(this).closest('tr').find('.staff-vehicles-value').text();
    let equipment = $(this).closest('tr').find('.staff-equipments-value').text();
    let addressArray = addressValues.split(",");


    $('#staff-firstname').val(firstName);
    $('#staff-lastname').val(lastName);
    $('#staff-designation').val(designation);
    $('#staff-gender').val(gender);
    $('#staff-joinDate').val(joinedDate);
    $('#staff-DateOfBirth').val(dateOfBirth);

    $('#staff-address1').val(addressArray[0] || '');
    $('#staff-address2').val(addressArray[1] || '');
    $('#staff-address3').val(addressArray[2] || '');
    $('#staff-address4').val(addressArray[3] || '');
    $('#staff-address5').val(addressArray[4] || '');

    $('#staff-contactNumber').val(contactNumber);
    $('#staff-email').val(email);
    $('#staff-role').val(role);
    let fieldArray = field.split(",");
    fieldArray.forEach(field => {
        addStaffField(field.trim());
    });
    let vehicleArray = vehicle.split(",")
    vehicleArray.forEach((vehicle =>{
        addStaffVehicle(vehicle.trim())
    }));
    let equipmentArray = equipment.split(",")
    equipmentArray.forEach((equipment =>{
        addStaffEquipment(equipment.trim())
    }));

});

//clear fields
$('#clear-employee-btn').on('click', () => {
    clearFields();
})

function clearFields() {
    $('#staff-firstname').val("");
    $('#staff-lastname').val("");
    $('#staff-designation').val("");
    $('#staff-gender').val("");
    $('#staff-joinDate').val("");
    $('#staff-DateOfBirth').val("");
    $('#staff-address1').val("");
    $('#staff-address2').val("");
    $('#staff-address3').val("");
    $('#staff-address4').val("");
    $('#staff-address5').val("");
    $('#staff-contactNumber').val("");
    $('#staff-email').val("");
    $('#staff-role').val("");
    $("#staff-selectedFieldsSearch").empty();
    $("#staff-selectedVehicleSearch").empty();
    $("#staff-selectedEquipmentSearch").empty();

    // Reset the selected arrays
    selectedStaffFields = [];
    selectedStaffVehicle = [];
    selectedStaffEquipment = [];
}

function loadStaffTable() {

    $('#staff-table-body').empty();
    staffArray.forEach((staff) => {
        let address = `${staff.address1}, ${staff.address2}, ${staff.address3}, ${staff.address4}, ${staff.address5}`;
        let record = `<tr>
                <td class="staff-id-value fs-6">S00-001</td>
                <td class="staff-firstname-value fs-6">${staff.firstName}</td>
                <td class="staff-lastname-value fs-6">${staff.lastName}</td>
                <td class="staff-designation-value fs-6">${staff.designation}</td>
                <td class="staff-gender-value fs-6">${staff.gender}</td>
                <td class="staff-joinDate-value fs-6">${staff.joinedDate}</td>
                <td class="staff-DateOfBirth-value fs-6">${staff.dateOfBirth}</td>
                <td class="staff-address1-value fs-6">${address}</td>
                <td class="staff-contactNumber-value fs-6">${staff.contactNumber}</td>
                <td class="staff-email-value fs-6">${staff.email}</td>
                <td class="staff-role-value fs-6">${staff.role}</td>
                <td class="staff-fields-value fs-6">${staff.field.join(", ")}</td>
                <td class="staff-vehicles-value fs-6">${staff.vehicle.join(", ")}</td>
                <td class="staff-equipments-value fs-6">${staff.equipment.join(", ")}</td>
               
                <td>
                    <button id="staff-update-btn" data-bs-toggle="modal" data-bs-target="#add-staff-modal">
                       <i class="fa-solid fa-pen" style="color: #1fad14;"></i>
                    <button id="staff-delete-btn" ><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>`;
        $('#staff-table-body').append(record);
    });
}

function  setLabel(btnName,modalLabel) {
    $('#create-employee-btn').text(btnName);
    $('#staffModalLabel').text(modalLabel);
}

//delete staff
$('#staff-table-body').on('click', '#staff-delete-btn', function () {
    let recordIndexItem = $(this).closest('tr').index();
    let staffId = $(this).closest('tr').find('.staff-id-value').text();
    staffArray.splice(recordIndexItem, 1);
    loadStaffTable()
});