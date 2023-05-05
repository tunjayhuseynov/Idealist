import { useState } from "react";
import type { IAnimalDB } from "types/category/Animal";
import { Form, Select, Checkbox } from "antd";
import CreateForm from "components/CreateForm/CreateForm";
import type { ICity } from "types/city";
import { AdminCrud } from "modules/Crud-Admin";
import { IGenericAnimalType, useAnimal } from "hooks/useAnimal";

interface IProps {
  categories: IAnimalDB[];
  cityList: ICity[];
}

export default function Yarat({ categories: animalDB, cityList }: IProps) {
  const [selectedAnimal, setSelectedAnimal] = useState<IAnimalDB>();

  const { onFinish } = useAnimal({ selectedAnimal });

  const onCategoryChanged = (e: string) => {
    setSelectedAnimal(animalDB?.find((animal) => animal.id === e));
  };

  return (
    <div className="mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
      <div className="mt-8 grid grid-cols-[65%,35%]">
        <div className="rounded p-6">
          <CreateForm<IGenericAnimalType>
            onFinish={onFinish}
            cityList={cityList}
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
              <Select onSelect={onCategoryChanged} placeholder="Heyvan növü">
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

export async function getStaticProps() {
  let categories = await new AdminCrud("dbAnimal").GetAll();
  let cityList = await new AdminCrud("cities").GetAll();

  return {
    props: {
      categories,
      cityList,
    },
    revalidate: 3600,
  };
}
