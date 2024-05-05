export class User {

    _id:number;
    id:string;
    name: string;
    address: string;
    phone: string;
    idCard: string;
    status: string;

    constructor(user:any){
        this._id = user._id;
        this.id = user.id;
        this.name = user.name;
        this.address = user.address;
        this.phone = user.phone;
        this.idCard = user.idCard;
        this.status = user.status;
    }
}
