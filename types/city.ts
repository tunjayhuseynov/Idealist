export interface IVillage {
    id: string;
    name: string
}

export interface IRegion {
    id: string;
    name: string;
    villages: { [id: string]: IVillage } | null
}

export interface IMetro {
    id: string;
    name: string
}


export interface ICity {
    id: string,
    name: string;
    regions: { [id: string]: IRegion } | null
    metros: { [id: string]: IMetro } | null
}