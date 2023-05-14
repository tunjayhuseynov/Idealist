import { ICreateFormProps, IOnFinish } from "components/CreateForm/types";
import { Crud } from "modules/Crud";
import { IAutoDB, INewAuto } from "types/category/Auto";
import {
  AutoBansType,
  AutoColours,
  AutoFuelType,
  AutoGearBox,
  AutoGearType,
  AutoMarket,
  AutoSituation,
  VehicleSupplies,
} from "types/category/consts/Auto";
import { ICity } from "types/city";

interface IProps {
  selectedAuto: IAutoDB | undefined;
}

export type IGenericAutoType = {
  category: string; // ID
  year: number;
  VIN: string;
  mark?: string; // Required Auto
  model?: string; // Required Auto
  banType?: keyof typeof AutoBansType; // Required Auto
  mileage?: {
    measure: "km" | "ml";
    number: number;
  }; // Required Auto
  colour?: keyof typeof AutoColours; // Required Auto
  ownerNo?: number;
  fuelType?: keyof typeof AutoFuelType; // Required Auto
  gearType?: keyof typeof AutoGearType; // Required Auto
  gearBox?: keyof typeof AutoGearBox; // Required Auto
  engineCapacity?: number; // Required Auto
  enginePower?: number; // Required Auto
  market?: keyof typeof AutoMarket;
  situation?: (keyof typeof AutoSituation)[]; // Required Auto
  numberOFfseats?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | "8+" | "notMentioned";
  vehicleSupplies?: (keyof typeof VehicleSupplies)[]; // Required Auto
};

export function useAuto({ selectedAuto }: IProps) {
  const auto = new Crud<INewAuto>("Auto");

  const onFinish: ICreateFormProps<IGenericAutoType>["onFinish"] = async (
    values,
    cities,
    images,
    postId,
    coordinates
  ) => {
    try {
      // console.log(values);
      // if (!selectedAuto) throw Error("Nəqliyyatı növü seçilməyib");
      const selectedCity = cities?.find((city) => city.id === values.city);
      if (!selectedAuto) throw Error("Neqliyat növü seçilməyib");
      if (!selectedCity) throw Error("Şəhər seçilməyib");
      if(values.year) throw Error("Il seçilməyib")
      if(values.VIN) throw Error("VIN seçilməyib")

      // let newDocument: INewAuto = {

      // }

      // console.log(values);
      // throw Error("Test");
    } catch (e: any) {
      throw new Error(e);
    }
  };

  return { onFinish };
}
