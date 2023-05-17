import { ICommon, IJoinR } from "./Common";
import {
  AutoBansType,
  AutoFuelType,
  AutoGearBox,
  AutoGearType,
  AutoSituation,
  VehicleSupplies,
} from "./consts/Auto";

export interface IAutoDB {
  id: number;
  label: string;
  name: string;
  marks: IAutoMark[] | null;
  isAutoMobile: boolean;
}

export interface IAutoMark {
  name: string;
  models:
    | {
        name: string;
        title: string | null;
      }[]
    | null;
}

export interface IAuto extends ICommon {
  category: IJoinR;
  city: IJoinR;
  year: number;
  mark: IJoinR;
  VIN: string;
  mileage: {
    measure: "km" | "ml";
    count: number;
  };
  colour: IJoinR;
  vehicleSuppplies: { [name in keyof typeof VehicleSupplies]: boolean };
  model: IJoinR;
  banType: keyof typeof AutoBansType | null;
  gearBox: keyof typeof AutoGearBox;
  gearType: keyof typeof AutoGearType;
  isNew: boolean;
  numberOfSeats: number | string;
  situation: { [name in keyof typeof AutoSituation]: boolean };
  fuelType: keyof typeof AutoFuelType;
}
