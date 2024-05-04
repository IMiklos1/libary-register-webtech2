export class User {

    _id:number;
    name: string;
    address: string;
    phone: string;
    idCard: string;
    status: string;

    constructor(user:any){
        this._id = user._id;
        this.name = user.name;
        this.address = user.address;
        this.phone = user.phone;
        this.idCard = user.idCard;
        this.status = user.status;
    }
}
