import type { ICommon, IJoinR } from "./Common";

export interface IAnimalDB {
  id: string;
  name: string;
  genera:
    | {
        id: string;
        value: string;
      }[]
    | null;
}

export interface IAnimal extends ICommon {
  category: IJoinR;
  genera: IJoinR | null;
  hasDelivery: boolean;
  title: string;
  city: IJoinR;
}
