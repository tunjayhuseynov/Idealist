import { IOnFinish } from "components/CreateForm/types";
import { Crud } from "modules/Crud";
import { IAnimal, IAnimalDB } from "types/category/Animal";
import { ICity } from "types/city";

export interface IGenericAnimalType {
    category: string;
    genera?: string;
    hasDelivery: boolean;
}

interface IProps {
    selectedAnimal: IAnimalDB | undefined
}

export function useAnimal({ selectedAnimal }: IProps) {
    const animal = new Crud<IAnimal>("Animal");

    const onFinish = async (values: IOnFinish & IGenericAnimalType, cities: ICity[], images: string[]) => {
        try {
            if (!selectedAnimal) throw Error("Heyvan növü seçilməyib")
            const selectedGenera = selectedAnimal.genera?.find((genera) => genera.id === values?.genera)
            const selectedCity = cities?.find((city) => city.id === values.city)

            const animalIem: IAnimal = {
                id: crypto.randomUUID(),
                packageName: "Standart",
                statusName: "Pending",
                createdBy: "",
                paymentData: null,
                createdAt: new Date().getTime(),
                updatedAt: new Date().getTime(),
                about: values.about,
                currency: values.currency,
                price: +values.price,
                contactName: values.contactName,
                email: values.email,
                phone: values.phone,
                isWp: values.isWp,
                isCall: values.isCall,
                images,
                category: {
                    id: selectedAnimal.id ?? "",
                    value: selectedAnimal.name ?? "",
                    isDeleted: false
                },
                genera: selectedGenera ? {
                    id: selectedGenera.id,
                    value: selectedGenera.value,
                    isDeleted: false
                } : null,
                hasDelivery: values.hasDelivery,
                title: values.title ?? "",
                city: {
                    id: values.city,
                    value: selectedCity?.name ?? "",
                    isDeleted: false
                }
            }

            await animal.Create(animalIem)
        } catch (e) {
            throw new Error(e as any)
        }
    };

    return { onFinish }
}