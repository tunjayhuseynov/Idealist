import { ICreateFormProps } from "components/CreateForm/types";
import { Crud } from "modules/Crud";
import { IBina, IBinaDB, IBinaTikili } from "types/category/Bina";
import { IRentDuration } from "types/category/Common";
import {
  BinaRentPropertyTypeOptions,
  Communal,
  BinaRentNotAllowed,
  BinaRentPros,
  NearbyLocationNames,
  BinaContracts,
  LandAppointments,
} from "types/category/consts/Bina";

export type IGenericBinaType = {
  category: string; // ID
  contract?: keyof typeof BinaContracts;
  address: string;
  nearbyLocations: (keyof typeof NearbyLocationNames)[];
  communal: (keyof typeof Communal)[];
  areaSize: number;
  ownerType: "owner" | "agent";
  propertySellType: IBina["propertySellType"];
  tikili?: {
    roomAmountChanged: "yes" | "no";
    floor: number;
    buildingFloorAmount?: number;
    roomAmount: number;
    temir: IBinaTikili["temir"];
    hamam: number;
    withStuff: boolean;
    rentalStatus?: {
      rentPropertyType: (typeof BinaRentPropertyTypeOptions)[number]["value"];
      rentNotAllowed: (keyof typeof BinaRentNotAllowed)[];
      rentDuration: keyof typeof IRentDuration;
      rentalPros: (keyof typeof BinaRentPros)[];
    };
  };
  land?: {
    landSize: number;
    landAppointment: keyof typeof LandAppointments;
  };
};

interface IProps {
  selectedBina: IBinaDB | undefined;
}

export function useBina({ selectedBina }: IProps) {
  const bina = new Crud<IBina>("Bina");

  const onFinish: ICreateFormProps<IGenericBinaType>["onFinish"] = async (
    values,
    cities,
    images,
    postId,
    coordinates
  ) => {
    try {
      const selectedCity = cities?.find((city) => city.id === values.city);
      if (!selectedBina) throw Error("Əmlak növü seçilməyib");
      if (!selectedCity) throw Error("Şəhər seçilməyib");
      if (selectedBina.tikili && !values.tikili)
        throw Error("Tikili məlumatları yoxdur");
      if (selectedBina.torpaq && !values.land)
        throw Error("Torpaq məlumatları yoxdur");
      const selectedRegion = values.region
        ? selectedCity.regions?.[values.region]
        : null;
      const selectedVillage = values.village
        ? selectedRegion?.villages?.[values.village]
        : null;
      const selectedMetro = values.metro
        ? selectedCity.metros?.[values.metro]
        : null;

      let newDocument: IBina = {
        id: postId,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        statusName: "Pending",
        packageName: "Standart",
        createdBy: "",
        images,
        paymentData: null,

        propertySellType: values.propertySellType,
        category: {
          id: selectedBina.id,
          value: selectedBina.name,
        },
        city: {
          id: selectedCity.id,
          value: selectedCity.name,
        },
        region: selectedRegion
          ? {
            id: selectedRegion.id,
            value: selectedRegion.name,
          }
          : null,
        village: selectedVillage
          ? {
            id: selectedVillage.id,
            value: selectedVillage.name,
          }
          : null,
        metro: selectedMetro
          ? {
            id: selectedMetro.id,
            value: selectedMetro.name,
          }
          : null,

        currency: values.currency,
        price: values.price,
        about: values.about,
        address: values.address,
        contract: values?.contract ?? null,

        metroWay: (selectedMetro && values.toMetro) ? {
          metroDuration: values.toMetro.minutes,
          metroWay: values.toMetro.transport
        } : null,

        torpaq: values.land
          ? {
            landSize: values.land.landSize,
            landAppointment: values.land.landAppointment,
          }
          : null,
        tikili:
          selectedBina.tikili && values.tikili
            ? {
              roomAmountChanged: values.tikili.roomAmountChanged === "yes",
              areaSize: values.areaSize,
              buildingFloorAmount: values.tikili?.buildingFloorAmount ?? 0,
              floor: values.tikili.floor,
              hamam: values.tikili.hamam,
              roomAmount: values.tikili.roomAmount,
              temir: values.tikili.temir,
              withStuff: values.tikili.withStuff,
              rentalStatus: values.tikili.rentalStatus
                ? {
                  rentPropertyType:
                    values.tikili.rentalStatus.rentPropertyType,
                  rentDuration: values.tikili.rentalStatus.rentDuration,
                  rentNotAllowed: {
                    noAnimal:
                      values.tikili.rentalStatus.rentNotAllowed.includes(
                        "noAnimal"
                      ),
                    noChild:
                      values.tikili.rentalStatus.rentNotAllowed.includes(
                        "noChild"
                      ),
                    noSmoking:
                      values.tikili.rentalStatus.rentNotAllowed.includes(
                        "noSmoking"
                      ),
                  },
                  rentProps: {
                    centralHeatingSystem:
                      values.tikili.rentalStatus.rentalPros.includes(
                        "centralHeatingSystem"
                      ),
                    cabelTv:
                      values.tikili.rentalStatus.rentalPros.includes(
                        "cabelTv"
                      ),
                    combi:
                      values.tikili.rentalStatus.rentalPros.includes(
                        "combi"
                      ),
                    balcony:
                      values.tikili.rentalStatus.rentalPros.includes(
                        "balcony"
                      ),
                    internet:
                      values.tikili.rentalStatus.rentalPros.includes(
                        "internet"
                      ),
                    garage:
                      values.tikili.rentalStatus.rentalPros.includes(
                        "garage"
                      ),
                    pool: values.tikili.rentalStatus.rentalPros.includes(
                      "pool"
                    ),
                    lift: values.tikili.rentalStatus.rentalPros.includes(
                      "lift"
                    ),
                    airConditioner:
                      values.tikili.rentalStatus.rentalPros.includes(
                        "airConditioner"
                      ),
                    kitchen:
                      values.tikili.rentalStatus.rentalPros.includes(
                        "kitchen"
                      ),
                    washer:
                      values.tikili.rentalStatus.rentalPros.includes(
                        "washer"
                      ),
                    parkingArea:
                      values.tikili.rentalStatus.rentalPros.includes(
                        "parkingArea"
                      ),
                    pvcWindow:
                      values.tikili.rentalStatus.rentalPros.includes(
                        "pvcWindow"
                      ),
                    dishes:
                      values.tikili.rentalStatus.rentalPros.includes(
                        "dishes"
                      ),
                    refrigerator:
                      values.tikili.rentalStatus.rentalPros.includes(
                        "refrigerator"
                      ),
                    telephone:
                      values.tikili.rentalStatus.rentalPros.includes(
                        "telephone"
                      ),
                    tv: values.tikili.rentalStatus.rentalPros.includes(
                      "tv"
                    ),
                  },
                }
                : null,
            }
            : null,

        coordinate: {
          lat: coordinates.lat,
          lng: coordinates.lng,
        },
        communal: {
          light: values.communal.includes("light"),
          water: values.communal.includes("water"),
          sewerage: values.communal.includes("sewerage"),
          gas: values.communal.includes("gas"),
        },
        nearbyServices: {
          busstop: values.nearbyLocations.includes("busstop"),
          hospital: values.nearbyLocations.includes("hospital"),
          kindigarden: values.nearbyLocations.includes("kindigarden"),
          mall: values.nearbyLocations.includes("mall"),
          school: values.nearbyLocations.includes("school"),
          market: values.nearbyLocations.includes("market"),
        },

        isPublisherOwner: values.ownerType == "owner",
        contactInfo: {
          phone: values.phone,
          isCall: values.isCall,
          isWp: values.isWp,
          email: values.email,
          contactName: values.contactName,
        },
      };
      console.log(newDocument);

      await bina.Create(newDocument);
    } catch (e) {
      throw new Error(e as any);
    }
  };

  return { onFinish };
}