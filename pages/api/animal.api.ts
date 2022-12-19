import { adminApp } from "fb/adminSdk";
import { NextApiRequest, NextApiResponse } from "next";
import { IAnimalDB } from "types/category/Animal";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // let doc = await adminApp.firestore().collection("dbAnimal").doc("categories").get()
    // let categories = doc.data() as { data: IAnimalDB[] };

    // for (const e of categories.data) {
    //     let body: IAnimalDB = {
    //         genera: e.genera ?? null,
    //         name: e.name,
    //         type: e.type ?? null
    //     }
    //     await adminApp.firestore().collection("dbAnimal").doc(body.name).set(body)
    // }


    res.json({
        "title": "\"Heyvanlar\" növlü elan əlavə edirsiniz",
    })
}