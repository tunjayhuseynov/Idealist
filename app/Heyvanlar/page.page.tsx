import { AdminCrud } from "modules/Crud-Admin";
import { IAnimalDB } from "types/category/Animal";
import { ICity } from "types/city";
import AnimalYarat from "./index.client";



export default async function Page() {
    let categories = await new AdminCrud<IAnimalDB>("dbAnimal").GetAll();
    let cityList = await new AdminCrud<ICity>("cities").GetAll();
    
    return <AnimalYarat categories={categories} cityList={cityList}/>
}