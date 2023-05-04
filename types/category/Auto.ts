import { ICommon } from "./Common";

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
  marks:
    | {
        name: string;
        models:
          | {
              name: string;
              title: string | null;
            }[]
          | null;
      }[]
    | null;
}

export interface iAuto extends ICommon {
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
