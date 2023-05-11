import { Checkbox, Col, Form, Radio, Row } from "antd";
import { IRentDuration } from "types/category/Common";
import {
  BinaRentNotAllowed,
  BinaRentPropertyTypeOptions,
  BinaRentPros,
} from "types/category/consts/Bina";

interface IProps {}

export default function YaratRental({}: IProps) {
  //No animal no child
  return (
    <>
      <Form.Item
        name={["tikili", "rentalStatus", "rentDuration"]}
        label="Kirayə müddəti"
        rules={[{ required: true, message: "Kirayə müddəti seçilməyib" }]}
      >
        <Radio.Group>
          {Object.entries(IRentDuration).map(([k, v]) => (
            <Radio key={k} value={k}>
              {v}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
      <Form.Item
        name={["tikili", "rentalStatus", "rentPropertyType"]}
        label="Kirayə tipi"
        rules={[{ required: true, message: "Kirayə tipi seçilməyib" }]}
      >
        <Radio.Group
          options={[...BinaRentPropertyTypeOptions]}
          optionType="button"
          buttonStyle="solid"
        />
      </Form.Item>
      <Form.Item
        name={["tikili", "rentalStatus", "rentalPros"]}
        label="Kirayə daxildir"
        valuePropName="checked"
      >
        <Checkbox.Group>
          <Row>
            {Object.entries(BinaRentPros).map(([k, v]) => (
              <Col key={k} span={8}>
                <Checkbox value={k} style={{ lineHeight: "32px" }}>
                  {v}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>
      <Form.Item
        name={["tikili", "rentalStatus", "rentNotAllowed"]}
        label="Qadağalar"
        valuePropName="checked"
      >
        <Checkbox.Group>
          <Row>
            {Object.entries(BinaRentNotAllowed).map(([k, v]) => (
              <Col key={k} span={12}>
                <Checkbox value={k} style={{ lineHeight: "32px" }}>
                  {v}
                </Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
      </Form.Item>
    </>
  );
}
