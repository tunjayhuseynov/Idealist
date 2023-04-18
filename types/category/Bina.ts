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

export const IBinaRentDuration = {
	"Aylıq": "Aylıq",
	"Günlük": "Günlük",
	"Həftəlik": "Həftəlik"
} as const

export const IBinaRentPros = {
	cabelTv: "Kabel Tv",
	pvcWindow: "PVC Pəncərələr",
	combi: "Kombi",

	garaj: "Qaraj",
	parkingArea: "Parking ərazisi",
	eyvan: "Eyvan",
	lift: "Lift",
	hovuz: "Hovuz",
	metbex: "Mətbəx",
	qab: "Qab",
	paltar: "Paltar",
	soyuducu: "Soyuducu",
	tv: "Televizor",
	kondicioner: "Kondisioner",
	internet: "Internet",
	telefon: "Telefon xətti",
}

type BinaRentDurations = typeof IBinaRentDuration[keyof typeof IBinaRentDuration]
interface IBinaRentalStatus {
	rentDuration: BinaRentDurations;
	cabelTv: boolean;
	pvcWindow: boolean;
	combi: boolean;

	garaj: boolean;
	parkingArea: boolean;
	eyvan: boolean;
	lift: boolean;
	hovuz: boolean;
	metbex: boolean;
	qab: boolean;
	paltar: boolean;
	soyuducu: boolean;
	tv: boolean;
	kondicioner: boolean;
	internet: boolean;
	telefon: boolean;

	noChild: boolean;
	noAnimal: boolean;
	centralHeatingSystem: boolean;
	isOnlyRoom: boolean;
}

export interface IBina extends ICommon {
	category: IJoinR;
	city: IJoinR;
	region: IJoinR; // Add To City
	village: IJoinR; // Add To Region in City
	metro: IJoinR | null; // Add To City

	metroWay: "Ayaq ilə" | "Nəqliyyat ilə";
	metroDuration: number;
	target: string;
	lat: number;
	lng: number;


	nearbyServices: IBinaNearbyServices;
	isPublisherOwner: boolean;
	qaz: boolean;
	su: boolean;
	isig: boolean;
	kanalizasiya: boolean;
	propertySellType: "selling" | "renting";
	tikili: IBinaTikili;
	torpaq: IBinaTorpaq;
	description: string


	contract: string;
	madeinHouse: boolean; // Unknown
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

}

interface IBinaTorpaq {
	landAppointment: string;
	landSize: number;
}
