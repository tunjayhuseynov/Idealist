import { ICreateFormProps, IOnFinish } from "components/CreateForm/types";
import { Crud } from "modules/Crud";
import { IAutoDB, IAuto } from "types/category/Auto";
import {
  AutoBansType,
  AutoColours,
  AutoFuelType,
  AutoGearBox,
  AutoGearType,
  AutoMarket,
  AutoSituation,
  VehicleSupply,
} from "types/category/consts/Auto";
import { ICity } from "types/city";

interface IProps {
  selectedAuto: IAutoDB | undefined;
}

export type IGenericTransportationTypeM<T> = {
  category: string; // ID
  year: number;
  VIN: string;
};

export type IGenericAutoType = {
  mark: string;
  model: string;
  banType: keyof typeof AutoBansType;
  mileage: {
    measure: "km" | "ml";
    number: number;
  };
  colour: keyof typeof AutoColours;
  ownerNo?: number;
  fuelType: keyof typeof AutoFuelType;
  gearType: keyof typeof AutoGearType;
  gearBox: keyof typeof AutoGearBox;
  engineCapacity: number;
  enginePower: number;
  market?: keyof typeof AutoMarket;
  situation: (keyof typeof AutoSituation)[];
  numberOFfseats?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | "8+" | "notMentioned";
  vehicleSupplies: (keyof typeof VehicleSupply)[];
};

export function useAuto({ selectedAuto }: IProps) {
  const auto = new Crud<IAuto>("Auto");

  const onFinish: ICreateFormProps<
    IGenericTransportationTypeM<null | IGenericAutoType>
  >["onFinish"] = async (
    values: IOnFinish,
    cities: ICity[],
    images: string[]
  ) => {
    try {
      console.log(values);
      // if (!selectedAuto) throw Error("Nəqliyyatı növü seçilməyib");

      // const selectedCity = cities?.find((city) => city.id === values.city);

      // console.log(values);
      // throw Error("Test");
    } catch (e: any) {
      throw new Error(e);
    }
  };

  return { onFinish };
}
