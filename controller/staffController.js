import StaffModel from "../model/staffModel.js";
import {staffArray,fieldArray,equipmentArray,vehicleArray} from "../db/db.js";
import {StaffAPI} from "../api/StaffAPI.js";
import {UserAPI} from "../api/UserAPI.js";


let customerRecordIndex = undefined;
let staffApi = new StaffAPI();
let userApi = new UserAPI();

let selectField = [];
let selectVehicle = [];
let selectEquipment = []
//suggestions fields
$(document).ready(function () {
    loadStaff();
    // Show suggestions based on input
    $("#staff-fieldSearch").on("input", function () {
        const query = $(this).val().toLowerCase();
        $("#autocomplete-staffFieldSearch").empty();

        // Filter crops based on input
        const suggestions = fieldArray.filter(field => field.fieldCode.toLowerCase().includes(query));
        suggestions.forEach(field => {
            $("#autocomplete-staffFieldSearch").append(`<div class="autocomplete-suggestion-staffField">${field.fieldCode}</div>`);
        });

        // Show suggestions
        $("#autocomplete-staffFieldSearch").show();
    });

    $("#staff-vehicleSearch").on("input", function () {
        const query = $(this).val().toLowerCase();
        $("#autocomplete-staffVehicleSearch").empty();

        // Filter crops based on input
        const suggestions = vehicleArray.filter(vehicle => vehicle.licensePlateNumber.toLowerCase().includes(query));
        suggestions.forEach(vehicle => {
            $("#autocomplete-staffVehicleSearch").append(`<div class="autocomplete-suggestion-staffVehicle">${vehicle.licensePlateNumber}</div>`);
        });

        // Show suggestions
        $("#autocomplete-staffVehicleSearch").show();
    });

    $("#staff-equipmentSearch").on("input", function () {
        const query = $(this).val().toLowerCase();
        $("#autocomplete-staffEquipmentSearch").empty();

        // Filter crops based on input
        const suggestions = equipmentArray.filter(equip => equip.equipmentId.toLowerCase().includes(query));
        suggestions.forEach(equip => {
            $("#autocomplete-staffEquipmentSearch").append(`<div class="autocomplete-suggestion-staffEquipment">${equip.equipmentId}</div>`);
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
    const equipment = equipmentArray.find(eq => eq.equipmentId === staffEquipment); // Find the equipment by ID
    if (!equipment) {
        alert("Equipment not found.");
        return;
    }

    const equipmentCount = equipment.totalCount; // Get the current available count

    if (equipmentCount <= 0) {
        alert("No more equipment available for allocation.");
        return;
    }

    // Check if the staff already has this equipment assigned
    const existingAssignment = selectedStaffEquipment.find(item => item.equipmentId === staffEquipment);
    if (existingAssignment) {
        alert("This equipment is already assigned to this staff.");
        return;
    }

    // Prompt the user for the equipment count
    const equipmentAllocatedCount = prompt(`Enter the equipment count for ${staffEquipment} (Available: ${equipmentCount})`);

    if (equipmentAllocatedCount && !isNaN(equipmentAllocatedCount)) {
        const count = parseInt(equipmentAllocatedCount, 10);

        if (count > 0 && count <= equipmentCount) {
            // Add the equipment to the staff's selection
            selectedStaffEquipment.push({ equipmentId: staffEquipment, count: count });

            // Deduct the allocated count from the available count
            equipment.totalCount -= count;

            // Update the UI
            $("#staff-selectedEquipmentSearch").append(`
                <div class="card mb-2 p-2 border-primary bg-success-subtle" data-equipmentStaff="${staffEquipment}">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-title mb-0">${staffEquipment}</h6>
                            <span class="badge bg-success">${count} pcs</span>
                        </div>
                        <button class="btn-close" type="button" data-equipment="${staffEquipment}"></button>
                    </div>
                </div>
            `);
        } else {
            alert("Invalid count or not enough equipment available.");
        }
    } else {
        alert("Invalid input. Please try again.");
    }
}


// Remove crop from selected fields
function removeStaffField(staffField) {
    staffField = $.trim(staffField); // Clean the input
    $(`[data-field="${staffField}"]`).remove(); // Remove from UI
    // Remove from selectedStaffFields array
    selectedStaffFields = selectedStaffFields.filter(field => field !== staffField);
}


function removeStaffVehicle(staffVehicle) {
    staffVehicle = $.trim(staffVehicle);
    $(`[data-vehicle="${staffVehicle}"]`).remove();
}

function removeStaffEquipment(staffEquipment) {
    staffEquipment = $.trim(staffEquipment);
    $(`[data-equipment="${staffEquipment}"]`).remove();
}

let staffId = "STAFF-001";
//save staff

// Save or update staff
$('#create-employee-btn').on('click', async () => {
    setLabel("CREATE EMPLOYEE", "Add Employee");

    let id;
    if ($('#create-employee-btn').text() === "CREATE EMPLOYEE") {
        id = generateStaffId();
    } else {
        id = staffId; // Use the current staffId if updating an existing employee
    }

    let firstName = $('#staff-firstname').val();
    let lastName = $('#staff-lastname').val();
    let designation = $('#staff-designation').val().toUpperCase();
    let gender = $('#staff-gender').val().toUpperCase();
    let joinDate = $('#staff-joinDate').val();
    let dateOfBirth = $('#staff-DateOfBirth').val();
    let address1 = $('#staff-address1').val();
    let address2 = $('#staff-address2').val();
    let address3 = $('#staff-address3').val();
    let address4 = $('#staff-address4').val();
    let address5 = $('#staff-address5').val();
    let contactNumber = $('#staff-contactNumber').val();
    let email = $('#staff-email').val();
    let role = $('#staff-role').val().toUpperCase();
    selectField = [...selectedStaffFields];
    selectVehicle = selectedStaffVehicle;
    selectEquipment = selectedStaffEquipment;
    clearFields();

    const staffDataObj = new StaffModel(firstName, lastName, designation, gender, joinDate, dateOfBirth,
        address1, address2, address3, address4, address5, contactNumber, email, role, selectField, selectVehicle,
        selectEquipment
    );

    if (customerRecordIndex !== undefined) {
        $("#staff-selectedFieldsSearch").empty();
        $("#staff-selectedVehicleSearch").empty();
        $("#staff-selectedEquipmentSearch").empty();

        // Update staff
        console.log("Updating Staff: ", staffDataObj);
        await staffApi.updateStaff(staffDataObj, staffArray[customerRecordIndex].staffId);

    } else {
        // Create new staff
        await staffApi.saveStaff(staffDataObj);
        if (staffDataObj.role !== "OTHER") {
            await userApi.saveUser(staffDataObj);
        }

    }

    $('#add-staff-modal').modal('hide'); // Hide modal after saving
});

// Update button handler
// Update button handler
$('#staff-table-body').on('click', '#staff-update-btn', function () {
    setLabel("UPDATE EMPLOYEE", "Update Employee");

    customerRecordIndex = $(this).closest('tr').index(); // Get the index of the clicked row
    const staff = staffArray[customerRecordIndex]; // Retrieve the selected staff record

    // Clear old selections
    clearSelections();

    // Populate the form fields with staff data
    $('#staff-firstname').val(staff.firstName);
    $('#staff-lastname').val(staff.lastName);
    $('#staff-designation').val(staff.designation);
    $('#staff-gender').val(staff.gender);
    $('#staff-joinDate').val(staff.joinedDate);
    $('#staff-DateOfBirth').val(staff.dateOfBirth);

    $('#staff-address1').val(staff.address1);
    $('#staff-address2').val(staff.address2);
    $('#staff-address3').val(staff.address3);
    $('#staff-address4').val(staff.address4);
    $('#staff-address5').val(staff.address5);

    $('#staff-contactNumber').val(staff.contactNumber);
    $('#staff-email').val(staff.email);
    $('#staff-role').val(staff.role);

    // Re-populate selected fields, vehicles, and equipment
    staff.field.forEach(field => addStaffField(field)); // Ensure UI and data sync
    staff.vehicles.forEach(vehicle => addStaffVehicle(vehicle));
    staff.equipments.forEach(equipment => {
        addStaffEquipment(equipment.staff); // Add equipment
        updateEquipmentCountInUI(equipment.staff, equipment.count); // Update the count
    });
});

function updateEquipmentCountInUI(staffEquipment, count) {
    // Check if the equipment card exists, update its count
    const card = $(`[data-equipmentStaff="${staffEquipment}"]`);
    if (card.length) {
        card.find('.badge').text(`${count} pcs`);
    }
}


// Clear selected fields, vehicles, and equipment
function clearSelections() {
    $("#staff-selectedFieldsSearch").empty();
    $("#staff-selectedVehicleSearch").empty();
    $("#staff-selectedEquipmentSearch").empty();

    selectedStaffFields.length = 0; // Clear the array
    selectedStaffVehicle.length = 0; // Clear the array
    selectedStaffEquipment.length = 0; // Clear the array
}


// Delete staff
$('#staff-table-body').on('click', '#staff-delete-btn', function () {
    const recordIndexItem = $(this).closest('tr').index();
    staffApi.deleteStaff(staffArray[recordIndexItem].staffId);
    loadStaffTable();
});


//clear fields
$('#clear-employee-btn').on('click', () => {
    clearFields();
})
$('#close-field-btn').on('click',()=>{
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

function loadStaffTable(sortedStaffList) {
    $('#staff-table-body').empty();
    sortedStaffList.forEach((staff) => {
        let address = `${staff.address1 || ""}, ${staff.address2 || ""}, ${staff.address3 || ""}, ${staff.address4 || ""}, ${staff.address5 || ""}`;
        let fields = Array.isArray(staff.field) ? staff.field.join(", ") : "No fields assigned";
        let vehicles = Array.isArray(staff.vehicles)
            ? staff.vehicles.join(", ")
            : "No vehicles assigned";
        let equipments = Array.isArray(staff.equipment) ? staff.equipment.map(eq => `${eq.staff} (${eq.count})`).join(", ") : "No equipment assigned";

        let record = `
            <tr>
                <td class="staff-id-value fs-6">${staff.staffId}</td>
                <td class="staff-firstname-value fs-6">${staff.firstName || ""}</td>
                <td class="staff-lastname-value fs-6">${staff.lastName || ""}</td>
                <td class="staff-designation-value fs-6">${staff.designation || ""}</td>
                <td class="staff-gender-value fs-6">${staff.gender || ""}</td>
                <td class="staff-joinDate-value fs-6">${staff.joinedDate || ""}</td>
                <td class="staff-DateOfBirth-value fs-6">${staff.dateOfBirth || ""}</td>
                <td class="staff-address1-value fs-6">${address}</td>
                <td class="staff-contactNumber-value fs-6">${staff.contactNumber || ""}</td>
                <td class="staff-email-value fs-6">${staff.email || ""}</td>
                <td class="staff-role-value fs-6">${staff.role || ""}</td>
                <td class="staff-fields-value fs-6">${fields}</td>
                <td class="staff-vehicles-value fs-6">${vehicles}</td>
                <td class="staff-equipments-value fs-6">${equipments}</td>
                <td>
                    <button id="staff-update-btn" data-bs-toggle="modal" data-bs-target="#add-staff-modal">
                        <i class="fa-solid fa-pen" style="color: #1fad14;"></i>
                    </button>
                    <button id="staff-delete-btn"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>`;
        $('#staff-table-body').append(record);
    });
}


function  setLabel(btnName,modalLabel) {
    $('#create-employee-btn').text(btnName);
    $('#staffModalLabel').text(modalLabel);
}



function generateStaffId() {
    let split = staffId.split("-");
    let newNumericPart = (parseInt(split[1], 10) + 1).toString().padStart(split[1].length, '0');
    staffId = `${split[0]}-${newNumericPart}`;
    return staffId;
}

async function loadStaff() {
    try {
        const staffs = await staffApi.getStaff();
        staffArray.push(...staffs); // Spread operator adds all fields to fieldArray
        $("#staffSortBy").val("ALL")
        await loadTaleSorting("ALL");
    } catch (error) {
        console.error("Error loading staff:", error); // Use console.error for errors
    }
}



$("#staffSortBy").on('change', async () => {
    await loadTaleSorting($("#staffSortBy").val());
})

let staffList ;
async function loadTaleSorting(designation){
    var sortedStaffList = [];
    if (designation === "ALL"){
        console.log("ALL")
        staffArray.map(function (staff) {
            sortedStaffList.push(staff);
        });
        staffList = sortedStaffList;
       loadStaffTable(sortedStaffList);
    }else {
        staffArray.map(function (staff) {
            if (staff.designation === designation) {
                sortedStaffList.push(staff);
            }
        });
        staffList = sortedStaffList;
        loadStaffTable(sortedStaffList);
    }
}