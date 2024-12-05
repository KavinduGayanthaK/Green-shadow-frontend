export class FieldModel{
    get fieldCode() {
        return this._fieldCode;
    }

    set fieldCode(value) {
        this._fieldCode = value;
    }

    get fieldName() {
        return this._fieldName;
    }

    set fieldName(value) {
        this._fieldName = value;
    }

    get location() {
        return this._location;
    }

    set location(value) {
        this._location = value;
    }

    get extendSizeOfField() {
        return this._extendSizeOfField;
    }

    set extendSizeOfField(value) {
        this._extendSizeOfField = value;
    }

    get crops() {
        return this._crops;
    }

    set crops(value) {
        this._crops = value;
    }

    get staff() {
        return this._staff;
    }

    set staff(value) {
        this._staff = value;
    }

    get image1() {
        return this._image1;
    }

    set image1(value) {
        this._image1 = value;
    }

    get image2() {
        return this._image2;
    }

    set image2(value) {
        this._image2 = value;
    }


    constructor(fieldCode,fieldName,location,extendSizeOfField, crops,staff, image1,image2){
        this._fieldCode = fieldCode;
        this._fieldName = fieldName;
        this._location = location;
        this._extendSizeOfField = extendSizeOfField;
        this._crops = crops;
        this._staff = staff;
        this._image1 = image1;
        this._image2 = image2;


    }
}