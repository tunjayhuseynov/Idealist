import { IOnFinish } from "components/CreateForm/types";
import { Crud } from "modules/Crud";
import { IBina, IBinaDB } from "types/category/Bina";
import { ICity } from "types/city";

export const NearbyLocationNames = {
    school: "Məktəb",
    busstop: "Avtobus dayanacağı",
    hospital: "Xəstəxana",
    mall: "Ticarət mərkəzi",
    kindigarden: "Uşaq bağçası",
    market: "Super market"
} as const

export const Communal = {
    gas: "Qaz",
    water: "Su",
    light: "İşıq",
    sewerage: "Kanalizasiya" 
} as const

export type IGenericBinaType = {
    category: string, // ID
    nearbyLocations: (keyof typeof NearbyLocationNames)[],
    communal: (keyof typeof Communal)[],
    areaSize: number,
    ownerType: "owner" | "agent",
    tikili?: {
        floor: number,
        buildingFloorAmount?: number,
        roomAmount: number,
        temir: "Təmirli" | "Təmirsiz" | "Orta";
        hamam: number,
        withStuff: boolean
    }
}

interface IProps {
    selectedBina: IBinaDB | undefined
}

export function useBina({ selectedBina }: IProps) {
    const bina = new Crud<IBina>("Bina");

    const onFinish = async (values: IOnFinish & IGenericBinaType, cities: ICity[], images: string[]) => {
        try {
            if (!selectedBina) throw Error("Əmlak növü seçilməyib")
            const selectedCity = cities?.find((city) => city.id === values.city)

            console.log(values)
            throw Error("Test")

        } catch (e) {
            throw new Error(e as any)
        }
    };

    return { onFinish }
}