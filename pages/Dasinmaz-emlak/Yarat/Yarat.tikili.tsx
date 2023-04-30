import { Form, Input, Radio } from "antd";
import YaratRental from "./Yarat.rental";

interface IProps {
    buildingFloor: boolean,
    renting: boolean
}

export default function YaratTikil({ buildingFloor = false, renting = false }: IProps) {
    return <>
        <Form.Item
            name={["tikili", "floor"]}
            label="Mərtəbə"
            rules={[{
                required: true,
                message: 'Mərtəbə sayı boşdur',
                validator: (_, value) => {
                    if (value && value > 0) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject('Mərtəbə sayı 0-dan yuxarı olmalıdır');
                    }
                }
            }]}
        >
            <Input type="number" placeholder="Mərtəbə sayı" />
        </Form.Item>
        {buildingFloor && <Form.Item
            name={["tikili", "buildingFloorAmount"]}
            label="Binanın mərtəbə sayı"
            rules={[{
                required: true,
                message: 'Binanın mərtəbə sayı boşdur',
                validator: (_, value) => {
                    if (value && value > 0) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject('Binanın mərtəbə sayı 0-dan yuxarı olmalıdır');
                    }
                }
            }]}
        >
            <Input type="number" placeholder="Binanın mərtəbə sayı" />
        </Form.Item>}
        <Form.Item
            name={["tikili", "roomAmount"]}
            label="Otaq sayı"
            rules={[{
                required: true,
                message: 'Otaq sayı boşdur',
                validator: (_, value) => {
                    if (value && value > 0) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject('Otaq sayı 0-dan yuxarı olmalıdır');
                    }
                }
            }]}
        >
            <Input type="number" placeholder="Otaq sayı" />
        </Form.Item>
        <Form.Item name={["tikili", "roomAmountChanged"]} label="Otaq sayı dəyişdirilib?" rules={[{ required: true }]}>
            <Radio.Group
                options={[{ label: "Bəli", value: "yes" }, { label: "Xeyir", value: "no" }]}
                optionType="button"
                defaultValue={"whole"}
                buttonStyle="solid"
            />
        </Form.Item>
        <Form.Item
            name={["tikili", "hamam"]}
            label="Hamam sayı"
            rules={[{
                required: true,
                message: 'Hamam sayı boşdur',
                validator: (_, value) => {
                    if (value && value > 0) {
                        return Promise.resolve();
                    } else {
                        return Promise.reject('Hamam sayı 0-dan yuxarı olmalıdır');
                    }
                }
            }]}
        >
            <Input type="number" placeholder="Otaq sayı" />
        </Form.Item>
        <Form.Item name={["tikili", "temir"]} label="Təmir vəziyyəti" rules={[{ required: true }]}>
            <Radio.Group>
                <Radio value="Təmirli">Təmirli</Radio>
                <Radio value="Orta">Orta</Radio>
                <Radio value="Təmirsiz">Təmirsiz</Radio>
            </Radio.Group>
        </Form.Item>
        <Form.Item name={["tikili", "withStuff"]} label="Əşya vəziyyəti" rules={[{ required: true }]}>
            <Radio.Group>
                <Radio value={true}>Əşyalı</Radio>
                <Radio value={false}>Əşyasız</Radio>
            </Radio.Group>
        </Form.Item>
        {renting && <YaratRental />}
    </>
}