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
  banType: boolean;
  capacity: boolean;
  checkboxes: boolean;
  fuel: boolean;
  id: number;
  label: string;
  mileage: boolean;
  name: string;
  power: boolean;
  title: boolean;
  transmissionBox: boolean;
  transmitter: boolean;
  marks: IAutoMark[] | null;
  withSupplies: boolean;
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
  sellType: string; //
  rentDuration: string; //
  type: string;
  mark: string; //
  model: string; //
  ban: string; //
  kredit: boolean; //
  barter: boolean; //
  color: string; //
  power: number; //
  capacity: number; //
  fuel: number; //
  transmitter: string; //
  transmissionBox: string; //
  year: number; //
  mileage: number; //
  city: string; //

  //Chechboxs
  abs: boolean;
  yungulLehimDisk: boolean;
  lyuk: boolean;
  yagisSensor: boolean;
  merkeziQapanma: boolean;
  parkRadar: boolean;
  kondisioner: boolean;
  oturacaqIsitme: boolean;
  deriSalon: boolean;
  yanPerde: boolean;
  oturacaqVentilyasiya: boolean;
  ksenonLampa: boolean;
  arxaKamera: boolean;
  bortKomputer: boolean;
  esp: boolean;
  kruizKontrol: boolean;
  startStopSistemi: boolean;
}

export interface INewAuto extends ICommon {
  category: IJoinR;
  city: IJoinR;
  year: number;
  mark: IJoinR;
  VIN: string;
  mileage: {
    measure: string;
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
