import { ICommon } from "./Common";

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


export interface IBina extends ICommon {
	category: string;
	city: string;
	region: string;
	village: string;
	metro: string;
	sellType: string;
	roomAmount: number;
	floor: number;
	buildingFloor: number;
	landAppointment: string;
	rentDuration: string;
	areaSize: number;
	temir: string;
	houseFloor: number;
	lat: number;
	lng: number;
	hamam: number;
	eyvan: boolean;
	lift: boolean;
	hovuz: boolean;
	qaz: boolean;
	su: boolean;
	isig: boolean;
	kanalizasiya: boolean;
	owner: boolean;
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
	otagordaire: boolean;
	target: string;
	metroWay: string;
	metroDuration: number;
	secondAreaSize: number;
	customAdress: string;
	contract: string;
	propertySelling: string;

	nearSchool: boolean;
	nearBusstop: boolean;
	nearHospital: boolean;
	nearShop: boolean;
	nearKindigarden: boolean;
	nearMall: boolean;
	withstuffs: boolean;

	madeinHouse: boolean;
	centralHeatingSystem: boolean;
	parkingArea: boolean;
	cabelTv: boolean;
	pvcWindow: boolean;
	combi: boolean;
	garaj: boolean;

	nometro: boolean;
}
