import { IRentDuration } from "types";
import type { ICommon, IJoinR } from "./Common";

export interface IBinaDB {
	id: string,
	buildingFloor: boolean
	tikili: boolean;
	torpaq: boolean;
	areaUnit: string,
	barter: boolean,
	madeinHouse: boolean,
	name: string,
	subname: string,
	rentalStatus: boolean
}

interface IBinaNearbyServices {
	nearSchool: boolean;
	nearBusstop: boolean;
	nearHospital: boolean;
	nearShop: boolean;
	nearKindigarden: boolean;
	nearMall: boolean;
}


type BinaRentDurations = typeof IRentDuration[keyof typeof IRentDuration]
interface IBinaRentalStatus {
	rentDuration: BinaRentDurations;
	rentPropertyType: "onlyRoom" | "whole",
	rentProps: {
		cabelTv: boolean;
		pvcWindow: boolean;
		combi: boolean;
		garage: boolean;
		parkingArea: boolean;
		balcony: boolean;
		lift: boolean;
		pool: boolean;
		kitchen: boolean;
		dishes: boolean;
		washer: boolean;
		refrigerator: boolean;
		tv: boolean;
		airConditioner: boolean;
		internet: boolean;
		telephone: boolean;
		centralHeatingSystem: boolean;
	},
	rentNotAllowed: {
		noChild: boolean;
		noAnimal: boolean;
	}
}

export interface IBina extends ICommon {
	category: IJoinR;
	city: IJoinR;
	region: IJoinR | null; // Add To City
	village: IJoinR | null; // Add To Region in City
	metro: IJoinR | null; // Add To City

	metroWay: {
		metroWay: "Ayaq ilə" | "Nəqliyyat ilə";
		metroDuration: number;
	} | null
	coordinate: {
		lat: number;
		lng: number;
	}

	nearbyServices: IBinaNearbyServices;
	isPublisherOwner: boolean;
	communal: {
		qaz: boolean;
		su: boolean;
		isig: boolean;
		kanalizasiya: boolean;
	}
	propertySellType: "selling" | "renting";
	tikili: IBinaTikili | null;
	torpaq: IBinaTorpaq | null;


	contract: string;
	address: string;
}

export interface IBinaTikili {
	roomAmount: number;
	areaSize: number;
	floor: number;
	buildingFloorAmount: number;
	temir: "Təmirli" | "Təmirsiz" | "Orta";
	hamam: number;
	withStuff: boolean;
	rentalStatus: IBinaRentalStatus | null
	roomAmountChanged: boolean;

}

interface IBinaTorpaq {
	landAppointment: string;
	landSize: number;
}
