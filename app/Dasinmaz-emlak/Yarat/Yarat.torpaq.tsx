import { Form, Input, Select } from "antd";
import { LandAppointments } from "types/category/consts/Bina";

interface IProps {}

export default function YaratTorpaq({}: IProps) {
  return (
    <>
      <Form.Item
        label="Torpağın Sahəsi"
        name={["land", "landSize"]}
        rules={[
          {
            required: true,
            message: "Torpağın Sahəsi boşdur",
            validator: (_, value) => {
              if (value && value > 0) {
                return Promise.resolve();
              } else {
                return Promise.reject("Torpağın Sahəsi 0-dan yuxarı olmalıdır");
              }
            },
          },
        ]}
      >
        <Input type="number" placeholder="Torpağın sahəsi" />
      </Form.Item>
      <Form.Item
        label="Torpağın təyinatı"
        name={["land", "landAppointment"]}
        rules={[
          {
            required: true,
            message: "Torpağın təyinatı boşdur",
          },
        ]}
      >
        <Select placeholder="Torpağın təyinatı">
          {Object.entries(LandAppointments)?.map(([k, appointment]) => {
            return (
              <Select.Option key={k} value={k}>
                {appointment}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>
    </>
  );
}
