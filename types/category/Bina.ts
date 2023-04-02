import { ICommon, IJoinR } from "./Common";

export interface IBinaDB {
	areaUnit: string,
	barter: boolean,
	belediyye: boolean,
	buildingFloor: boolean,
	cableTv: boolean,
	centralHeatingSystem: boolean,
	combi: boolean,
	eyvan: boolean,
	floor: boolean,
	garaj: boolean,
	hamam: boolean,
	houseFloor: boolean,
	hovuz: boolean,
	icare: boolean,
	isig: boolean,
	kanalizasiya: boolean,
	kondisoner: boolean,
	landAppointment: boolean,
	lift: boolean,
	madeinHouse: boolean,
	metbex: boolean,
	name: string,
	parkingArea: boolean,
	pvcWindow: boolean,
	qaz: boolean
	roomAmount: boolean,
	secondArea: boolean,
	su: boolean,
	subname: string,
	temir: true,
	rentalStatus: {
		cableTv: boolean,
		centralHeatingSystem: boolean,
		combi: boolean,
		garaj: boolean,
		heyvan: boolean,
		internet: boolean,
		kondicioner: boolean,
		metbexM: boolean,
		otagordaire: boolean,
		paltarY: boolean,
		parkingArea: boolean,
		pvcWindow: boolean,
		qabY: boolean,
		soyuducu: boolean,
		telefon: boolean,
		tv: boolean,
		usag: boolean
	} | null
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

interface IBinaTorpaq {
	landAppointment: string;
	secondAreaSizeForHouse: number;
	houseFloor: number;
	roomAmount: number | null;
}

interface IBinaTikili {
	roomAmount: number;
	rentalStatus: IBinaRentalStatus | null
	floor: number;
	buildingFloorAmount: number;
	temir: "Təmirli" | "Təmirsiz" | "Orta";
	hamam: number;
	withStuff: boolean;
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
	areaSize: number;
	isPublisherOwner: boolean;
	qaz: boolean;
	su: boolean;
	isig: boolean;
	kanalizasiya: boolean;

	lat: number;
	lng: number;

	torpaq: IBinaTorpaq;
	tikili: IBinaTikili;

	contract: string;
	propertySelling: string;
	madeinHouse: boolean;
}
