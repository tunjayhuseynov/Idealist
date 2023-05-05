import { IOnFinish } from "components/CreateForm/types";
import { Crud } from "modules/Crud";
import { IAutoDB, IAuto } from "types/category/Auto";
import { ICity } from "types/city";

interface IProps {
  selectedAuto: IAutoDB | undefined;
}

export type IGeneryAutoType = {
    
}

export function useAuto({ selectedAuto }: IProps) {
  const auto = new Crud<IAuto>("Auto");

  const onFinish = async (
    values: IOnFinish,
    cities: ICity[],
    images: string[]
  ) => {
    try {
      if (!selectedAuto) throw Error("Nəqliyyatı növü seçilməyib");

      const selectedCity = cities?.find((city) => city.id === values.city);

      console.log(values);
      throw Error("Test");
    } catch (e: any) {
      throw new Error(e);
    }
  };

  return { onFinish };
}
