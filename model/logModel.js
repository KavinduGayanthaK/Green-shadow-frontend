export class LogModel {
    get logCode() {
        return this._logCode;
    }

    set logCode(value) {
        this._logCode = value;
    }

    get logDetail() {
        return this._logDetail;
    }

    set logDetail(value) {
        this._logDetail = value;
    }

    get logDate() {
        return this._logDate;
    }

    set logDate(value) {
        this._logDate = value;
    }

    get logImage() {
        return this._logImage;
    }

    set logImage(value) {
        this._logImage = value;
    }

    get fields() {
        return this._fields;
    }

    set fields(value) {
        this._fields = value;
    }

    get staff() {
        return this._staff;
    }

    set staff(value) {
        this._staff = value;
    }

    get crop() {
        return this._crop;
    }

    set crop(value) {
        this._crop = value;
    }


    constructor(logCode,logDetail,logDate,logImage,fields,staff,crop) {

        this._logCode = logCode;
        this._logDetail = logDetail;
        this._logDate = logDate;
        this._logImage = logImage;
        this._fields = fields;
        this._staff = staff;
        this._crop = crop;


    }

}