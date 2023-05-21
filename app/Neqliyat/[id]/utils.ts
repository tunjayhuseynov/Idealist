import { IAuto } from "types/category/Auto";
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
} from "types/category/consts/Auto";

export async function DetailParser(doc: IAuto) {
  let details: { [name: string]: string } = {
    Kateqoriya: doc.category.value,
  };

  details["VIN-kod"] = doc.VIN;
  details["Il"] = doc.year.toFixed();
  if (doc.ownerNo) {
    details["Sahib sayi"] = doc.ownerNo?.toFixed();
  }

  if (doc.isAutoMobile) {
    details["Marka"] = doc.mark ?? "";
    details["Model"] = doc.model ?? "";
    details["Ban növü"] = doc.banType ? AutoBansType[doc.banType] : "";
    details["Yürüş"] =
      doc.mileage?.count.toFixed() + " " + doc.mileage?.measure;
    details["Rəng"] = doc.colour ? AutoColours[doc.colour] : "";
    details["Yanacaq növü"] = doc.fuelType ? AutoFuelType[doc.fuelType] : "";
    details["Ötürücü növü"] = doc.gearType ? AutoGearType[doc.gearType] : "";
    details["Sürətlər qutusu"] = doc.gearBox ? AutoGearBox[doc.gearBox] : "";
    details["Mühərrikin həcmi sm^3"] = doc.engineCapacity?.toFixed() ?? "";
    details["Mühərrikin gücü, a.g."] = doc.enginePower?.toFixed() ?? "";
    if (doc.market) {
      details["Market"] = doc.market ? AutoMarket[doc.market] : "";
    }
  }

  return details;
}

export async function BooleanDetailParser(doc: IAuto) {
  let booleanDetails: { [name: string]: string[] } = {};

  if (doc.vehicleSupplies) {
    booleanDetails["Avtomobil Təchizatları"] = Object.entries(
      doc.vehicleSupplies ?? {}
    )
      .filter(([key, value]) => value)
      .map(
        ([key, value]) => VehicleSupplies[key as keyof typeof VehicleSupplies]
      );
  }

  if (doc.situation) {
    booleanDetails["Vəziyyəti"] = Object.entries(doc.situation ?? {})
      .filter(([key, value]) => value)
      .map(([key, value]) => AutoSituation[key as keyof typeof AutoSituation]);
  }

  if (doc.additiional) {
    booleanDetails["Əlavə"] = Object.entries(doc.additiional ?? {})
      .filter(([key, value]) => value)
      .map(
        ([key, value]) => AutoAdditional[key as keyof typeof AutoAdditional]
      );
  }

  return booleanDetails;
}
