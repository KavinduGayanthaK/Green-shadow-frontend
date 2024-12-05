export default class StaffModel {
    get staffId() {
        return this._staffId;
    }

    set staffId(value) {
        this._staffId = value;
    }

    get firstName() {
        return this._firstName;
    }

    set firstName(value) {
        this._firstName = value;
    }

    get lastName() {
        return this._lastName;
    }

    set lastName(value) {
        this._lastName = value;
    }

    get designation() {
        return this._designation;
    }

    set designation(value) {
        this._designation = value;
    }

    get gender() {
        return this._gender;
    }

    set gender(value) {
        this._gender = value;
    }

    get joinedDate() {
        return this._joinedDate;
    }

    set joinedDate(value) {
        this._joinedDate = value;
    }

    get dateOfBirth() {
        return this._dateOfBirth;
    }

    set dateOfBirth(value) {
        this._dateOfBirth = value;
    }

    get address1() {
        return this._address1;
    }

    set address1(value) {
        this._address1 = value;
    }

    get address2() {
        return this._address2;
    }

    set address2(value) {
        this._address2 = value;
    }

    get address3() {
        return this._address3;
    }

    set address3(value) {
        this._address3 = value;
    }

    get address4() {
        return this._address4;
    }

    set address4(value) {
        this._address4 = value;
    }

    get address5() {
        return this._address5;
    }

    set address5(value) {
        this._address5 = value;
    }

    get contactNumber() {
        return this._contactNumber;
    }

    set contactNumber(value) {
        this._contactNumber = value;
    }

    get email() {
        return this._email;
    }

    set email(value) {
        this._email = value;
    }

    get role() {
        return this._role;
    }

    set role(value) {
        this._role = value;
    }

    get field() {
        return this._field;
    }

    set field(value) {
        this._field = value;
    }

    get vehicle() {
        return this._vehicle;
    }

    set vehicle(value) {
        this._vehicle = value;
    }

    get equipment() {
        return this._equipment;
    }

    set equipment(value) {
        this._equipment = value;
    }

    constructor(firstName,lastName,designation,gender,joinedDate,dateOfBirth,address1,address2,address3,address4,address5,contactNumber,email,role,field,vehicle,equipment) {

        this._firstName = firstName;
        this._lastName = lastName;
        this._designation = designation;
        this._gender = gender;
        this._joinedDate = joinedDate;
        this._dateOfBirth = dateOfBirth;
        this._address1 = address1;
        this._address2 = address2;
        this._address3 = address3;
        this._address4 = address4;
        this._address5 = address5;
        this._contactNumber = contactNumber;
        this._email = email;
        this._role = role;
        this._field = field;
        this._vehicle = vehicle;
        this._equipment = equipment;
    }
}