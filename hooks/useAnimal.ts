import { ICreateFormProps, IOnFinish } from "components/CreateForm/types";
import { Crud } from "modules/Crud";
import { IAnimal, IAnimalDB } from "types/category/Animal";
import { ICity } from "types/city";

export interface IGenericAnimalType {
  category: string;
  genera?: string;
  hasDelivery: boolean;
}

interface IProps {
  selectedAnimal: IAnimalDB | undefined;
}

export function useAnimal({ selectedAnimal }: IProps) {
  const animal = new Crud<IAnimal>("Animal");

  const onFinish: ICreateFormProps<IGenericAnimalType>["onFinish"] = async (
    values,
    cities,
    images,
    postId
  ) => {
    try {
      if (!selectedAnimal) throw Error("Heyvan növü seçilməyib");
      const selectedGenera = selectedAnimal.genera?.find(
        (genera) => genera.id === values?.genera
      );
      const selectedCity = cities?.find((city) => city.id === values.city);

      const animalIem: IAnimal = {
        id: postId,
        packageName: "Standart",
        statusName: "Pending",
        createdBy: "",
        paymentData: null,
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime(),
        about: values.about,
        currency: values.currency,
        price: +values.price,
        contactInfo: {
          contactName: values.contactName,
          email: values.email,
          phone: values.phone,
          isWp: values.isWp,
          isCall: values.isCall,
        },
        images,
        category: {
          id: selectedAnimal.id ?? "",
          value: selectedAnimal.name ?? "",
          isDeleted: false,
        },
        genera: selectedGenera
          ? {
              id: selectedGenera.id,
              value: selectedGenera.value,
              isDeleted: false,
            }
          : null,
        hasDelivery: values.hasDelivery,
        title: values.title ?? "",
        city: {
          id: values.city,
          value: selectedCity?.name ?? "",
          isDeleted: false,
        },
      };

      await animal.Create(animalIem);
    } catch (e) {
      throw new Error(e as any);
    }
  };

  return { onFinish };
}
