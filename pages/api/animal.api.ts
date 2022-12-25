import { adminApp } from "fb/adminSdk";
import { NextApiRequest, NextApiResponse } from "next";
import { IAnimalDB } from "types/category/Animal";
import uuid from 'react-uuid';
import { Crud } from "modules/Crud";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const animal = new Crud("dbAnimal");
    const db = await animal.GetAll()

    res.json(db)
}