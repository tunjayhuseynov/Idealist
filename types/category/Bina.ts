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

const IBinaRentDuration = {
	"Aylıq": "Aylıq",
	"Günlük": "Günlük",
	"Həftəlik": "Həftəlik"
} as const

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

	usag: boolean;
	heyvan: boolean;
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

	nearbyServices: IBinaNearbyServices;
	isPublisherOwner: boolean;
	qaz: boolean;
	su: boolean;
	isig: boolean;
	kanalizasiya: boolean;


	lat: number;
	lng: number;

	torpaq: IBinaTorpaq;
	tikili: IBinaTikili;
	description: string
	contract: string;
	propertySelling: "selling" | "renting";
	madeinHouse: boolean;
}

interface IBinaTikili {
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
	areaSize: number;
}
