import { DocumentReference } from "firebase/firestore";
import { ICommon } from "./Common";

export interface IAnimalDB {
    name: string;
    genera: {
        name: string;
    }[] | null;
}


export interface IAnimal extends ICommon {
    category: string;
    genera: string |  null;
    hasDelivery: boolean;
    title: string;
    city: string;
}