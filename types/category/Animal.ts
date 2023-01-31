import { DocumentReference } from "firebase/firestore";
import { ICommon } from "./Common";

export interface IAnimalDB {
    id: string
    name: string;
    genera: {
        id: string
        value: string;
    }[] | null;
}


export interface IAnimal extends ICommon {
    category: {
        value: string,
        id: string,
        isDeleted: boolean
    };
    genera: {
        id: string,
        value: string
        isDeleted: boolean
    } | null;
    hasDelivery: boolean;
    title: string;
    city: {
        id: string,
        name: string,
        isDeleted: boolean
    };
}