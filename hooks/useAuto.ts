import CompoundedSpace from "antd/es/space";
import { ICreateFormProps, IOnFinish } from "components/CreateForm/types";
import { verify } from "crypto";
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
  AutoAdditional,
  VehicleSupplies,
} from "types/category/consts/Auto";

export type IGenericAutoType = {
  category: string; // ID
  year: number;
  VIN: string;
  additional: (keyof typeof AutoAdditional)[];
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
  vehicleSupplies?: (keyof typeof VehicleSupplies)[]; // Required Auto
  numberOFfseats?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | "8+" | "notMentioned";
}; // 20

interface IProps {
  selectedAuto: IAutoDB | undefined;
}

export function useAuto({ selectedAuto }: IProps) {
  const auto = new Crud<IAuto>("Auto");

  const onFinish: ICreateFormProps<IGenericAutoType>["onFinish"] = async (
    values,
    cities,
    images,
    postId
  ) => {
    try {
      const selectedCity = cities?.find((city) => city.id === values.city);
      if (!selectedAuto) throw Error("Neqliyat növü seçilməyib");
      if (!selectedCity) throw Error("Şəhər seçilməyib");
      if (!values.year) throw Error("Il seçilməyib");
      if (!values.VIN) throw Error("VIN seçilməyib");

      let newDocument: IAuto = {
        category: {
          id: selectedAuto.id,
          value: selectedAuto.name,
        },
        title: values.title ?? null,
        isAutoMobile: selectedAuto.isAutoMobile,
        city: {
          id: selectedCity.id,
          value: selectedCity.name,
        },
        year: values.year,
        VIN: values.VIN,
        additiional: values.additional
          ? {
              isBarterPossible: values.additional.includes("isBarterPossible"),
              isOnCredit: values.additional.includes("isOnCredit"),
            }
          : null,
        model: values.model ?? null,
        mark: values.mark ?? null,
        mileage: {
          measure: values.mileage?.measure ?? "km",
          count: values.mileage?.number ?? 0,
        },
        colour: values.colour ?? null,
        engineCapacity: values.engineCapacity ?? null,
        enginePower: values.enginePower ?? null,
        vehicleSupplies: values.vehicleSupplies
          ? {
              abs: values.vehicleSupplies.includes("abs"),
              airCond: values.vehicleSupplies.includes("airCond"),
              alloyWheels: values.vehicleSupplies.includes("alloyWheels"),
              centralLocking: values.vehicleSupplies.includes("centralLocking"),
              hatch: values.vehicleSupplies.includes("hatch"),
              leatherSalon: values.vehicleSupplies.includes("leatherSalon"),
              parkingRadar: values.vehicleSupplies.includes("parkingRadar"),
              rainSensor: values.vehicleSupplies.includes("rainSensor"),
              rearCamera: values.vehicleSupplies.includes("rearCamera"),
              seatHeating: values.vehicleSupplies.includes("seatHeating"),
              seatVentilation:
                values.vehicleSupplies.includes("seatVentilation"),
              sideCurtains: values.vehicleSupplies.includes("sideCurtains"),
              xenonLamps: values.vehicleSupplies.includes("xenonLamps"),
            }
          : null,
        banType: values.banType ?? null,
        gearBox: values.gearBox ?? null,
        gearType: values.gearType ?? null,
        isNew: values.ownerNo ? (values.ownerNo === 1 ? true : false) : null,
        numberOfSeats: values.numberOFfseats ?? null,
        situation: values.situation
          ? {
              colored: values.situation.includes("colored"),
              spareParts: values.situation.includes("spareParts"),
              stroke: values.situation.includes("stroke"),
            }
          : null,
        fuelType: values.fuelType ?? null,
        market: values.market ?? null,
        ownerNo: values.ownerNo ?? null,
        id: postId,
        packageName: "Standart",
        statusName: "Pending",
        paymentData: null,
        createdBy: "",
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        about: values.about,
        currency: values.currency,
        price: values.price,
        images,
        contactInfo: {
          phone: `${values.phone.prefix}${values.phone.number}`,
          isCall: values.isCall,
          isWp: values.isWp,
          email: values.email,
          contactName: values.contactName,
        },
      };

      await auto.Create(newDocument);
    } catch (e: any) {
      throw new Error(e);
    }
  };

  return { onFinish };
}
