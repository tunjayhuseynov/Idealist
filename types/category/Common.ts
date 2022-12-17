export interface ICommon {
    id: string;


    packageName: string;
    statusName: string;

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
