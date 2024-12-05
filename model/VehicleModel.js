export class VehicleModel {
    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }


    get licensePlateNumber() {
        return this._licensePlateNumber;
    }

    set licensePlateNumber(value) {
        this._licensePlateNumber = value;
    }

    get category() {
        return this._category;
    }

    set category(value) {
        this._category = value;
    }

    get fuelType() {
        return this._fuelType;
    }

    set fuelType(value) {
        this._fuelType = value;
    }



    get staff() {
        return this._staff;
    }

    set staff(value) {
        this._staff = value;
    }

    get remarks() {
        return this._remarks;
    }

    set remarks(value) {
        this._remarks = value;
    }

    constructor(licensePlateNumber,category,fuelType,vehicleStatus,specialRemark,allocatedStaffMember) {
        this._licensePlateNumber = licensePlateNumber;
        this._category = category;
        this._fuelType = fuelType;
        this._status = vehicleStatus;
        this._remarks = specialRemark;
        this._staff = allocatedStaffMember;


    }
}