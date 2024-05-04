
export class Item {

    _id: string;
    number: string;

    type: string;

    author: string;

    title: string;

    procurementDate: Date;

    status: string;

    renterId: string;

    startRent: Date;

    constructor(item: any) {
        this._id = item._id
        this.number = item.number
        this.type = item.type
        this.author = item.author
        this.title = item.title
        this.procurementDate = item.procurementDate
        this.status = item.status
        this.renterId = item.renterId
        this.startRent = item.startRent
    }
}