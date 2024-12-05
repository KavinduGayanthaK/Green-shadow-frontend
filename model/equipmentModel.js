export class EquipmentModel{
    get equipmentId() {
        return this._equipmentId;
    }

    set equipmentId(value) {
        this._equipmentId = value;
    }

    get equipmentName() {
        return this._equipmentName;
    }

    set equipmentName(value) {
        this._equipmentName = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }

    get totalCount() {
        return this._totalCount;
    }

    set totalCount(value) {
        this._totalCount = value;
    }

    get assignedCount() {
        return this._assignedCount;
    }

    set assignedCount(value) {
        this._assignedCount = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get allocatedFields() {
        return this._allocatedFields;
    }

    set allocatedFields(value) {
        this._allocatedFields = value;
    }

    get allocatedStaffMembers() {
        return this._allocatedStaffMembers;
    }

    set allocatedStaffMembers(value) {
        this._allocatedStaffMembers = value;
    }


    constructor(equipmentId,equipmentName,type,totalCount,assignedCount,status,allocatedFields,allocatedStaffMembers) {


        this._equipmentId = equipmentId;
        this._equipmentName = equipmentName;
        this._type = type;
        this._totalCount = totalCount;
        this._assignedCount = assignedCount;
        this._status = status;
        this._allocatedFields = allocatedFields;
        this._allocatedStaffMembers = allocatedStaffMembers;
    }
}