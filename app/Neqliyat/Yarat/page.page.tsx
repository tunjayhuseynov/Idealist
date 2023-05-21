import { AdminCrud } from "modules/Crud-Admin";
import { ICity } from "types/city";
import NeqliyatYarat from "./index.client";
import { IAutoDB } from "types/category/Auto";

export default async function Page() {
  let categories = await new AdminCrud<IAutoDB>("dbAuto").GetAll();
  let cityList = await new AdminCrud<ICity>("cities").GetAll();
  let yearsArray = Array.from(
    {
      length: new Date().getFullYear() + 1 - 1903,
    },
    (value, index) => 1903 + index
  ).reverse();
  let engineCapacityArray = generateNumberArray();

  function generateNumberArray(): number[] {
    const result: number[] = [];
    let num = 50;
    let step = 50;

    while (num <= 16000) {
      result.push(num);
      num += step;

      if (num === 500) {
        step = 100;
      }
      if (num === 10000) {
        step = 1000;
      }
    }

    return result;
  }

  return (
    <NeqliyatYarat
      engineCapacutyArray={engineCapacityArray}
      categories={categories}
      cityList={cityList}
      yearsArray={yearsArray}
    />
  );
}
