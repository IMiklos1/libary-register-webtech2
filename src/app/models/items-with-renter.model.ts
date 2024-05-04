import { UserDto } from "./user-dto.model";

export interface ItemWithRenterDto {
    _id: string;
    number: string;
    type: string;
    author: string;
    title: string;
    procurementDate: Date;
    status: string;
    renterId: string;
    startRent: Date;
    renter: UserDto | null; // Add a property to hold the renter information
    differenceWithAddedDate?: number;
  }