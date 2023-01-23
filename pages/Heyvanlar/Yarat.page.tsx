import useAsyncEffect from "hooks/useAsyncEffect";
import { Crud } from "modules/Crud";
import { useState } from "react";
import { IAnimal, IAnimalDB } from "types/category/Animal";
import { Form, Input, Select, Checkbox, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Currency } from "types/category/Common";

const { TextArea } = Input;

interface Cities {
  name: string;
}

export default function Yarat() {
  const [animalDB, setAnimalDB] = useState<IAnimalDB[]>();
  const [cities, setCities] = useState<Cities[]>();
  const [selectedAnimal, setSelectedAnimal] = useState<IAnimalDB>();
  const [hasDelivery, setHasDelivery] = useState<boolean>(false);
  const [isWp, setIsWhatsApp] = useState<boolean>(false);
  const [isCall, setIsCall] = useState<boolean>(false);

  const animalDb = new Crud<IAnimalDB>("dbAnimal");
  const citiesDb = new Crud<Cities>("cities");
  const animal = new Crud<IAnimal>("Animal");

  const addAnimal = async (values: any) => {
    try{
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
        isWp,
        isCall,
        category: selectedAnimal!.name,
        genera: values.genera ?? null,
        hasDelivery,
        title: values.title,
        city: values.city
      }

      console.log(animal);

    
      await animal.Create(animalIem)
    }  catch(e) {
      throw new Error(e as any)
    }
  };

  const selectNumBefore = (
    <Select defaultValue="050">
      <Select.Option value="070">070</Select.Option>
      <Select.Option value="077">077</Select.Option>
      <Select.Option value="055">055</Select.Option>
      <Select.Option value="050">050</Select.Option>
      <Select.Option value="051">051</Select.Option>
    </Select>
  );

  useAsyncEffect(async () => {
    const respAnimal = await animalDb.GetAll();
    const respCities = await citiesDb.GetAll();
    setAnimalDB(respAnimal);
    setCities(respCities);
  }, []);

  return (
    <div className="mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
      <div className="mt-8 grid grid-cols-[65%,35%]">
        <div className="rounded p-6">
          <Form onFinish={addAnimal}>
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
                onSelect={(e) => {
                  setSelectedAnimal(animalDB?.find((animal) => animal.name === e))
                }}
                placeholder="Heyvan növü"
              >
                {animalDB?.map((animal) => {
                  return (
                    <Select.Option key={animal.name} value={animal.name}>
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
                    <Select.Option key={genus.name} value={genus.name}>
                      {genus.name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            )}
            <Form.Item 
              name="hasDelivery"
            >
              <Checkbox value={hasDelivery} onChange={(e) => setHasDelivery(e.target.checked)}>Çatdırılma?</Checkbox>
            </Form.Item>
            <Form.Item
              label="Elanın adı"
              name="title"
              rules={[
                {
                  required: true,
                  message: 'Elanın adı boşdur'
                },
              ]}
            >
              <Input placeholder="Elanın adı" />
            </Form.Item>
            <Form.Item
              label="Məzmun"
              name="about"
              rules={[
                {
                  required:true,
                  message: 'Məzmun boşdur'
                }
              ]}
            >
              <TextArea showCount maxLength={3000}/>
            </Form.Item>
            <Form.Item
              label="Valyuta"
              name="currency"
              rules={[{
                required: true
              }]}
            >
              <Select placeholder="Valyuta">
                {Object.values(Currency).map((cur) => {
                  return <Select.Option key={cur} value={cur}>
                    {cur}
                  </Select.Option>
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Qiymət"
              name="price"
              rules={[{
                required: true,
                message: 'Qiymət boşdur'
              }]}
            >
              <Input type="number" placeholder="Qiymət" />
            </Form.Item>
            <Form.Item
              label="Şəhər"
              name="city"
              rules={[{
                required: true
              }]}
            >
              <Select placeholder="Şəhər">
                {cities?.map((city) => {
                  return <Select.Option key={city.name} value={city.name}>
                    {city.name}
                  </Select.Option>
                })}
              </Select>
            </Form.Item>
            <Form.Item
              className="mt-20"
              label="Əlaqə adı"
              name="contactName"
              rules={[
                {
                  required: true,
                  message: 'Qiymət adı boşdur'
                },
              ]}
            >
              <Input placeholder="Əlaqə adı" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: 'Email adı boşdur'

                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Mobil nömrə"
              name='phone'
              rules={[
                {
                  required: true,
                  message: 'Mobil nömrə boşdur'

                },
              ]}
            >
              <Input addonBefore={selectNumBefore} type="number"  
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
                placeholder="XXX-XX-XX" />
            </Form.Item>
            <Form.Item
              name="isWp"
            >
              <Checkbox value={isWp} onChange={(e) => setIsWhatsApp(e.target.checked)} className="">WhatsApp?</Checkbox>
            </Form.Item>
            <Form.Item
              name="isCall"
            >
              <Checkbox value={isCall} onChange={(e) => setIsCall(e.target.checked)}>Zəng?</Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="rounded-full flex items-center float-right mt-10 text-white hover:!text-white bg-primary hover:bg-primaryHover"
              >
                <PlusOutlined /> Elanı əlavə et
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}
