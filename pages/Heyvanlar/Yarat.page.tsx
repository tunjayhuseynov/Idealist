import useAsyncEffect from "hooks/useAsyncEffect";
import { Crud } from "modules/Crud";
import { useState } from "react";
import { IAnimal, IAnimalDB } from "types/category/Animal";
import { Form, Select, Checkbox, } from "antd";
import CreateForm from "components/CreateForm/CreateForm";
import { ICity, IOnFinish } from "components/CreateForm/types";

interface IGenericType {
  category: string;
  genera?: string;
  hasDelivery: boolean;
}

export default function Yarat() {
  const [animalDB, setAnimalDB] = useState<IAnimalDB[]>();
  const [selectedAnimal, setSelectedAnimal] = useState<IAnimalDB>();

  const animalDb = new Crud<IAnimalDB>("dbAnimal");
  const animal = new Crud<IAnimal>("Animal");


  useAsyncEffect(async () => {
    const respAnimal = await animalDb.GetAll();
    setAnimalDB(respAnimal);
  }, []);

  const onCategoryChanged = (e: string) => {
    setSelectedAnimal(animalDB?.find((animal) => animal.id === e))
  };

  const GenericTypes: IGenericType = {
    category: "",
    genera: "",
    hasDelivery: false,
  }

  const onFinish = async (values: IOnFinish & IGenericType, cities: ICity[], images: string[]) => {
    try {
      const selectedGenera = selectedAnimal?.genera?.find((genera) => genera.id === values?.genera)
      const selectedCity = cities?.find((city) => city.id === values.city)

      const animalIem: IAnimal = {
        id: crypto.randomUUID(),
        packageName: "Standart",
        statusName: "Pending",
        createdBy: "",
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
        category: {
          id: selectedAnimal?.id ?? "",
          value: selectedAnimal?.name ?? "",
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
          name: selectedCity?.name ?? "",
          isDeleted: false
        }
      }

      await animal.Create(animalIem)
    } catch (e) {
      throw new Error(e as any)
    }
  };

  return (
    <div className="mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
      <div className="mt-8 grid grid-cols-[65%,35%]">
        <div className="rounded p-6">
          <CreateForm
            geenricTypes={GenericTypes}
            onFinish={onFinish}
          >
            <Form.Item
              label="Heyvan növü"
              name="category"
              rules={[
                {
                  required: true,
                  message: "Heyvan növü boşdur",
                },
              ]}
            >
              <Select
                onSelect={onCategoryChanged}
                placeholder="Heyvan növü"
              >
                {animalDB?.map((animal) => {
                  return (
                    <Select.Option key={animal.name} value={animal.id}>
                      {animal.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>

            {selectedAnimal?.genera && (
              <Form.Item
                label="Cins"
                name="genera"
                rules={[
                  {
                    required: true,
                    message: "Please select the genera for the animal!",
                  },
                ]}
              >
                <Select placeholder="Cins">
                  {selectedAnimal.genera?.map((genus) => (
                    <Select.Option key={genus.value} value={genus.id}>
                      {genus.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            <Form.Item
              name="hasDelivery"
              valuePropName="checked"
              initialValue={false}
              label="Çatdırılma?"
            >
              <Checkbox></Checkbox>
            </Form.Item>
          </CreateForm>
        </div>
      </div>
    </div>
  );
}
