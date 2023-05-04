import { IRentDuration } from "types";
import type { ICommon, IJoinR } from "./Common";
import { BinaContracts, BinaRentNotAllowed, LandAppointments, NearbyLocationNames } from "./consts/Bina";

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


type BinaRentDurations = keyof typeof IRentDuration
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
	rentNotAllowed: { [name in keyof typeof BinaRentNotAllowed]: boolean }
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

	nearbyServices: { [name in keyof typeof NearbyLocationNames]: boolean };
	isPublisherOwner: boolean;
	communal: {
		gas: boolean;
		water: boolean;
		light: boolean;
		sewerage: boolean;
	}
	propertySellType: "selling" | "renting";
	tikili: IBinaTikili | null;
	torpaq: IBinaTorpaq | null;


	contract: keyof typeof BinaContracts | null;
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
	landAppointment: keyof typeof LandAppointments;
	landSize: number;
}
