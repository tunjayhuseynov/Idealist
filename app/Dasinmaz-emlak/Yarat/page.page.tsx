import { AdminCrud } from "modules/Crud-Admin";
import { IBinaDB } from "types/category/Bina";
import { ICity } from "types/city";
import BinaYarat from "./index.client";

export default async function Page() {
  let categories = await new AdminCrud<IBinaDB>("dbBina").GetAll();
  let cityList = await new AdminCrud<ICity>("cities").GetAll();

  return <BinaYarat categories={categories} cityList={cityList} />;
}

export const revalidate = 3600;
