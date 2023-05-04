import { IBina } from "types/category/Bina"
import { BinaContracts, BinaRentNotAllowed, Communal, LandAppointments, NearbyLocationNames } from "types/category/consts/Bina"

export function DetailParser(doc: IBina) {
    let details: { [name: string]: string } = {
        "Kateqoriya": doc.category.value,
    }

    if (doc.contract) details["Sənəd növü"] = BinaContracts[doc.contract]

    if (doc.tikili) {
        const { areaSize, buildingFloorAmount, floor, hamam, roomAmount, roomAmountChanged, temir, withStuff } = doc.tikili

        details["Mərtəbə sayı"] = floor.toFixed()
        details["Binanın mərtəbə sayı"] = buildingFloorAmount.toFixed()
        details["Sahəsi"] = areaSize.toFixed()
        details["Otaq sayı"] = roomAmount.toFixed()
        details["Hamam sayı"] = hamam.toFixed()
        details["Təmir vəziyyəti"] = temir

    }


    if (doc.torpaq) {
        details["Torpaq təyinatı"] = LandAppointments[doc.torpaq.landAppointment]
        details["Torpaq sahəsi"] = `${doc.torpaq.landSize.toString()} sot`
    }

    return details;
}


export function BooleanDetailParser(doc: IBina) {
    let booleanDetails: { [name: string]: string[] } = {}

    booleanDetails["Kommunal xidətlər"] = Object.entries(doc.communal)
        .filter(([k, v]) => v)
        .map(([k, v]) => Communal[k as keyof typeof Communal])


    booleanDetails["Yaxınlıqda"] = Object.entries(doc.nearbyServices)
        .filter(([k, v]) => v)
        .map(([k, v]) => NearbyLocationNames[k as keyof typeof NearbyLocationNames])

    if (doc.tikili?.rentalStatus) {
        booleanDetails["Qadağalar"] = Object.entries(doc.tikili.rentalStatus.rentNotAllowed)
            .filter(([k, v]) => v)
            .map(([k, v]) => BinaRentNotAllowed[k as keyof typeof BinaRentNotAllowed])
    }


    return booleanDetails;
}