import { ICommon } from "./Common";

export interface IAnimalDB {
    name: string;
    genera: {
        name: string;
    }[] | null;
    type: {
        name: string;
    }[] | null;
}


export interface IAnimal extends ICommon {
    category: string;
    type: string;
    genera: string;
    hasDelivery: boolean;
    title: string;

    city: number;
}