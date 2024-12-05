import { EquipmentAPI } from "../api/equipmentAPI.js";
import { staffArray, fieldArray, equipmentArray } from "../db/db.js";
import { EquipmentModel } from "../model/equipmentModel.js";

let equipmentRecordIndex = null;
let equipmentId = "EQUIP-000";
let allocatedStaff = [];
let allocatedField = [];

const equipmentApi = new EquipmentAPI();


$(document).ready(function () {
    loadEquipment();
    $('#equipment-fieldSearch').closest('.col').hide();
    $('#equipment-staffSearch').closest('.col').hide();
    // Show suggestions for fields based on input
    $("#equipment-fieldSearch").on("input", function () {
        const query = $(this).val().toLowerCase();
        $("#autocomplete-equipmentFields").empty();

        const suggestions = fieldArray.filter(field => field.fieldCode.toLowerCase().includes(query));
        suggestions.forEach(field => {
            $("#autocomplete-equipmentFields").append(`<div class="autocomplete-suggestion-equipmentField">${field.fieldCode}</div>`);
        });

        $("#autocomplete-equipmentFields").show();
    });

    // Show suggestions for staff based on input
    $("#equipment-staffSearch").on("input", function () {
        const query = $(this).val().toLowerCase();
        $("#autocomplete-equipmentStaffMember").empty();

        const suggestions = staffArray.filter(staff => staff.staffId.toLowerCase().includes(query));
        suggestions.forEach(staff => {
            $("#autocomplete-equipmentStaffMember").append(`<div class="autocomplete-suggestion-equipmentStaffMember">${staff.staffId}</div>`);
        });

        $("#autocomplete-equipmentStaffMember").show();
    });
});

// Autocomplete item selection handlers
$(document).on("click", ".autocomplete-suggestion-equipmentStaffMember", function () {
    const equipmentStaff = $(this).text();
    addEquipmentStaff(equipmentStaff);
    $("#equipment-staffSearch").val("");
    $("#autocomplete-equipmentStaffMember").hide();
});

$(document).on("click", ".autocomplete-suggestion-equipmentField", function () {
    const equipmentField = $(this).text();
    addEquipmentField(equipmentField);
    $("#equipment-fieldSearch").val("");
    $("#autocomplete-equipmentFields").hide();
});

// Remove selected items
$(document).on("click", ".selected-item i", function () {
    const equipmentField = $(this).closest(".selected-item").attr("data-equipmentField");
    removeEquipmentField(equipmentField);
});

$(document).on("click", ".selected-item i", function () {
    const equipmentStaff = $(this).closest(".selected-item").attr("data-equipmentStaff");
    removeEquipmentStaff(equipmentStaff);
});

// Hide autocomplete dropdown when clicking outside
$(document).on("click", function (e) {
    if (!$(e.target).closest('#equipment-staffSearch, #autocomplete-equipmentStaffMember').length) {
        $("#autocomplete-equipmentStaffMember").hide();
    }
    if (!$(e.target).closest('#equipment-fieldSearch, #autocomplete-equipmentFields').length) {
        $("#autocomplete-equipmentFields").hide();
    }
});

// Functions to add and remove selected fields and staff
let selectedEquipmentFields = [];
function addEquipmentField(equipmentField) {
    // Get the equipment ID of the current record
    const equipmentId = equipmentArray[equipmentRecordIndex].equipmentId; // Example: equipment being allocated
    const equipment = equipmentArray.find(eq => eq.equipmentId === equipmentId); // Get the specific equipment data

    if (!equipment) {
        alert("Equipment not found.");
        return;
    }

    let remainingCount = equipment.totalCount; // Get remaining equipment count

    // Check if the staff is already allocated
    if (selectedEquipmentStaff.find(item => item.fields === equipmentField)) {
        alert("This field already has equipment allocated.");
        return;
    }

    // Check if there is enough equipment available
    if (remainingCount <= 0) {
        alert("No equipment available to allocate.");
        return;
    }

    // Prompt for equipment count to allocate
    const equipmentAllocatedCount = prompt(
        `Enter the equipment count for field: ${equipmentField} (Remaining: ${remainingCount} pcs)`
    );

    if (equipmentAllocatedCount && !isNaN(equipmentAllocatedCount)) {
        const count = parseInt(equipmentAllocatedCount, 10);

        // Validate the count is within the available range
        if (count > 0 && count <= remainingCount) {
            // Update the selected equipment staff array
            selectedEquipmentFields.push({ fields: equipmentField, count: count });

            // Update the remaining equipment count
            equipment.totalCount -= count;

            // Append the selected staff and equipment to the UI
            $("#equipment-selectedFields").append(`
                <div class="card mb-2 p-2 border-primary bg-success-subtle" data-equipmentField="${equipmentField}">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-title mb-0">${equipmentField}</h6>
                            <span class="badge bg-success">${count} pcs</span>
                        </div>
                        <button class="btn-close" type="button" data-field="${equipmentField}"></button>
                    </div>
                </div>
            `);

            alert(`${count} equipment allocated to ${equipmentField}. Remaining: ${equipment.totalCount} pcs.`);
        } else {
            alert(`Invalid count. Please enter a value between 1 and ${remainingCount}.`);
        }
    } else {
        alert("Invalid input. Please enter a valid number.");
    }
}

let selectedEquipmentStaff = [];
let remainingCount = 0
function addEquipmentStaff(equipmentStaff) {
    // Get the equipment ID of the current record
    const equipmentId = equipmentArray[equipmentRecordIndex].equipmentId; // Example: equipment being allocated
    const equipment = equipmentArray.find(eq => eq.equipmentId === equipmentId); // Get the specific equipment data

    if (!equipment) {
        alert("Equipment not found.");
        return;
    }

     remainingCount = equipment.totalCount; // Get remaining equipment count

    // Check if the staff is already allocated
    if (selectedEquipmentStaff.find(item => item.staff === equipmentStaff)) {
        alert("This staff member already has equipment allocated.");
        return;
    }

    // Check if there is enough equipment available
    if (remainingCount <= 0) {
        alert("No equipment available to allocate.");
        return;
    }

    // Prompt for equipment count to allocate
    const equipmentAllocatedCount = prompt(
        `Enter the equipment count for staff member: ${equipmentStaff} (Remaining: ${remainingCount} pcs)`
    );

    if (equipmentAllocatedCount && !isNaN(equipmentAllocatedCount)) {
        const count = parseInt(equipmentAllocatedCount, 10);

        // Validate the count is within the available range
        if (count > 0 && count <= remainingCount) {
            // Update the selected equipment staff array
            selectedEquipmentStaff.push({ staff: equipmentStaff, count: count });

            // Update the remaining equipment count
            equipment.totalCount -= count;

            // Append the selected staff and equipment to the UI
            $("#equipment-selectedStaffSearch").append(`
                <div class="card mb-2 p-2 border-primary bg-success-subtle" data-equipmentStaff="${equipmentStaff}">
                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="card-title mb-0">${equipmentStaff}</h6>
                            <span class="badge bg-success">${count} pcs</span>
                        </div>
                        <button class="btn-close" type="button" data-staff="${equipmentStaff}"></button>
                    </div>
                </div>
            `);

            alert(`${count} equipment allocated to ${equipmentStaff}. Remaining: ${equipment.equipmentCount} pcs.`);
        } else {
            alert(`Invalid count. Please enter a value between 1 and ${remainingCount}.`);
        }
    } else {
        alert("Invalid input. Please enter a valid number.");
    }
}

// Remove selected staff from allocation
$(document).on("click", ".btn-close", function () {
    const staffId = $(this).data("staff");

    // Find the staff allocation to remove
    const allocation = selectedEquipmentStaff.find(item => item.staff === staffId);
    if (allocation) {
        // Add back the equipment count to the remaining count
        const equipmentId = equipmentArray[equipmentRecordIndex].equipmentId;
        const equipment = equipmentArray.find(eq => eq.equipmentId === equipmentId);
        if (equipment) {
            equipment.totalCount += allocation.count;
        }

        // Remove the staff allocation from the array
        selectedEquipmentStaff = selectedEquipmentStaff.filter(item => item.staff !== staffId);

        // Remove the staff from the UI
        $(this).closest(".card").remove();

        alert(`Allocation removed for ${staffId}. Equipment count updated.`);
    }
});


$(document).on("click", ".btn-close", function () {
    const fieldId = $(this).data("field");

    // Find the staff allocation to remove
    const allocation = selectedEquipmentFields.find(item => item.fields === fieldId);
    if (allocation) {
        // Add back the equipment count to the remaining count
        const equipmentId = equipmentArray[equipmentRecordIndex].equipmentId;
        const equipment = equipmentArray.find(eq => eq.equipmentId === equipmentId);
        if (equipment) {
            equipment.totalCount += allocation.count;
        }

        // Remove the staff allocation from the array
        selectedEquipmentStaff = selectedEquipmentStaff.filter(item => item.staff !== staffId);

        // Remove the staff from the UI
        $(this).closest(".card").remove();

        alert(`Allocation removed for ${fieldId}. Equipment count updated.`);
    }
});

// function removeEquipmentField(equipmentField) {
//     equipmentField = $.trim(equipmentField);
//     $(`[data-equipmentField="${equipmentField}"]`).remove();
// }



// Create or update equipment
$('#create-equipment-btn').on('click', (event) => {
    setEquipmentModalLabel('CREATE EQUIPMENT', "Add Equipment");

    let eqId;

    if ($('#create-equipment-btn').text() === "CREATE EQUIPMENT") {
        eqId = generateEquipmentId();
    } else {
        eqId = equipmentId;
    }

    const equipmentName = $('#equipment-name').val();
    const equipmentType = $('#equipment-type').val();
    const equipmentCount = $('#equipment-count').val();
    const equipmentAssignCount = $('#equipment-assign-count').val();
    const status = $('#equipment-status').val();
    allocatedStaff = selectedEquipmentStaff;
    allocatedField = selectedEquipmentFields;

    const equipmentObj = new EquipmentModel(eqId, equipmentName, equipmentType, equipmentCount,equipmentAssignCount, status,allocatedField,allocatedStaff);

    if (equipmentRecordIndex !== null) {
        equipmentArray[equipmentRecordIndex] = equipmentObj;
        loadEquipmentTable();
        equipmentRecordIndex = null;
    } else {
        equipmentApi.saveEquipment(equipmentObj)

    }
    clearEquipmentModalFields();
});

// Set modal label
function setEquipmentModalLabel(btnName, modalLabel) {
    $('#create-equipment-btn').text(btnName);
    $('#equipmentModalLabel').text(modalLabel);

    if (btnName === "UPDATE EQUIPMENT") {
        // Show the input fields for staff and fields during update
        $('#equipment-fieldSearch').closest('.col').show();
        $('#equipment-staffSearch').closest('.col').show();
    } else {
        // Hide the input fields for staff and fields during add
        $('#equipment-fieldSearch').closest('.col').hide();
        $('#equipment-staffSearch').closest('.col').hide();
    }
}

// Clear equipment modal fields
function clearEquipmentModalFields() {
    $('#equipment-name').val("");
    $('#equipment-type').val("");
    $('#equipment-count').val("");
    $('#equipment-status').val("");
    selectedEquipmentFields = [];
    selectedEquipmentStaff = [];
    $('#equipment-selectedStaffSearch').empty();
    $('#equipment-selectedFields').empty();
}

// Update equipment
$('#equipment-table-body').on('click', '#equipment-update-btn', function () {
    setEquipmentModalLabel("UPDATE EQUIPMENT", "Update Equipment");

    equipmentRecordIndex = $(this).closest('tr').index();
    const equipment = equipmentArray[equipmentRecordIndex];

    $('#equipment-name').val(equipment.equipmentName);
    $('#equipment-type').val(equipment.type);
    $('#equipment-count').val(equipment.count);
    $('#equipment-status').val(equipment.status);

    clearSelections();
    if (equipment.allocatedStaffMember) {
        equipment.allocatedStaffMember.forEach(staff => addEquipmentStaff(staff));
    }
    if (equipment.allocatedFields) {
        equipment.allocatedFields.forEach(field => addEquipmentField(field));
    }
});

// Clear selected fields and staff
function clearSelections() {
    $("#equipment-selectedFields").empty();
    $('#equipment-selectedStaffSearch').empty();
    selectedEquipmentFields = [];
    selectedEquipmentStaff = [];
}

// Delete equipment
$('#equipment-table-body').on('click', '#equipment-delete-btn', function () {
    const recordIndexItem = $(this).closest('tr').index();
    equipmentArray.splice(recordIndexItem, 1);
    loadEquipmentTable();
});

// Load equipment table
function loadEquipmentTable() {
    $('#equipment-table-body').empty();
    equipmentArray.forEach((equipment, index) => {
        // const staffDetails = equipment.allocatedStaff.map(staffItem =>
        //     `${staffItem.staff} (${staffItem.count})`
        // ).join(", ");

        const record = `<tr>
            <td class="equipment-id-value fs-6">${equipment.equipmentId}</td>
            <td class="equipment-name-value fs-6">${equipment.equipmentName}</td>
            <td class="equipment-type-value fs-6">${equipment.type}</td>
            <td class="equipment-count-value fs-6">${equipment.totalCount}</td>
            <td class="equipment-count-value fs-6">${equipment.assignedCount}</td>
            <td class="equipment-status-value fs-6">${equipment.status}</td>
            
            <td>
                <button id="equipment-update-btn" data-bs-toggle="modal" data-bs-target="#add-equipment-modal">
                    <i class="fa-solid fa-pen" style="color: #1fad14;"></i>
                </button>
                <button id="equipment-delete-btn"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>`;
        $('#equipment-table-body').append(record);
    });
}


// Generate unique equipment ID
function generateEquipmentId() {
    const split = equipmentId.split("-");
    const newNumericPart = (parseInt(split[1], 10) + 1).toString().padStart(split[1].length, '0');
    equipmentId = `${split[0]}-${newNumericPart}`;
    return equipmentId;
}

$('#create-equipment-modal').on('show.bs.modal', function () {
    if ($('#create-equipment-btn').text() === "CREATE EQUIPMENT") {
        setEquipmentModalLabel('CREATE EQUIPMENT', 'Add Equipment');
    }
});

async function loadEquipment() {
    try {
        const equipment = await equipmentApi.getEquipment();
        equipmentArray.push(...equipment); // Spread operator adds all fields to fieldArray
        console.log("Loaded equipment:", equipmentArray); // Directly log the array
        loadEquipmentTable(); // Update the UI or perform further actions
    } catch (error) {
        console.error("Error loading equipment:", error); // Use console.error for errors
    }
}