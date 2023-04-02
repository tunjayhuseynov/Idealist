export interface ICommon {
    id: string;

    packageName: "VIP" | "Premium" | "Standart";
    statusName: "Pending" | "Approved" | "Denied";
    paymentData: {
        orderId: string
        sessionId: string
        paymentType: "bankCard",
        createdAt: number
    } | null

    createdBy: string;
    createdAt: number;
    updatedAt: number;

    about: string;
    currency: Currency;
    price: number;
    images: string[]

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

export interface IJoinR {
    value: string,
    id: string,
    isDeleted: boolean
}