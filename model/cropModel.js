export class CropModel{
    get commonName() {
        return this._commonName;
    }

    set commonName(value) {
        this._commonName = value;
    }

    get scientificName() {
        return this._scientificName;
    }

    set scientificName(value) {
        this._scientificName = value;
    }

    get cropCategory() {
        return this._cropCategory;
    }

    set cropCategory(value) {
        this._cropCategory = value;
    }

    get cropSeason() {
        return this._cropSeason;
    }

    set cropSeason(value) {
        this._cropSeason = value;
    }

    get fields() {
        return this._fields;
    }

    set fields(value) {
        this._fields = value;
    }

    get cropImage() {
        return this._cropImage;
    }

    set cropImage(value) {
        this._cropImage = value;
    }

    get cropCode() {
        return this._cropCode;
    }

    set cropCode(value) {
        this._cropCode = value;
    }

    constructor(cropCode,commonName,scientificName,cropCategory,cropSeason,fields,cropImage){
        this._cropCode = cropCode;
        this._commonName = commonName;
        this._scientificName = scientificName;
        this._cropCategory = cropCategory;
        this._cropSeason = cropSeason;
        this._fields = fields;
        this._cropImage = cropImage;
    }
}