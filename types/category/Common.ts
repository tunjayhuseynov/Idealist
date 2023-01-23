export interface ICommon {
    id: string;


    packageName: "VIP" | "Premium" | "Standart";
    statusName: "Pending" | "Approved" | "Denied";

    createdBy: string;
    createdAt: number;
    updatedAt: number;

    about: string;
    currency: Currency;
    price: number;


    //Contact
    contactName: string;
    email: string;
    phone: string;
    isWp: boolean;
    isCall: boolean;
}


export enum Currency {
    AZN = 'AZN',
    USD = 'USD',
}
