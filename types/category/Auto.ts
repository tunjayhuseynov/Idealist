import { ICommon, IJoinR } from "./Common";
import {
  AutoAdditional,
  AutoBansType,
  AutoColours,
  AutoFuelType,
  AutoGearBox,
  AutoGearType,
  AutoMarket,
  AutoSituation,
  VehicleSupplies,
} from "./consts/Auto";

export interface IAutoDB {
  id: string;
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
  title: string | null;
  city: IJoinR;
  year: number;
  VIN: string;
  mark: string | null;
  model: string | null;
  isAutoMobile: boolean;
  mileage: {
    measure: "km" | "ml";
    count: number;
  } | null;
  colour: keyof typeof AutoColours | null;
  banType: keyof typeof AutoBansType | null;
  gearBox: keyof typeof AutoGearBox | null;
  gearType: keyof typeof AutoGearType | null;
  isNew: boolean | null;
  numberOfSeats: number | string | null;
  situation: { [name in keyof typeof AutoSituation]: boolean } | null;
  additiional: { [name in keyof typeof AutoAdditional]: boolean } | null;
  vehicleSupplies: { [name in keyof typeof VehicleSupplies]: boolean } | null;
  fuelType: keyof typeof AutoFuelType | null;
  market: keyof typeof AutoMarket | null;
  ownerNo: number | null;
  engineCapacity: number | null;
  enginePower: number | null;
}
