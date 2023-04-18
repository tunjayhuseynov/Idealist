import { Checkbox, Col, Form, Radio, Row } from "antd";
import { IBinaRentDuration, IBinaRentPros } from "types/category/Bina";

interface IProps {

}

export default function YaratRental({ }: IProps) {

    return <>
        <Form.Item name={["tikili", "rentalStatus", "rentDuration"]} label="Kirayə müddəti" rules={[{ required: true }]}>
            <Radio.Group>
                {Object.entries(IBinaRentDuration).map(([k, v]) => <Radio value={k}>{v}</Radio>)}
            </Radio.Group>
        </Form.Item>
        <Form.Item name={["tikili", "rentalStatus", "rentalPros"]} label="Kirayə daxildir" valuePropName="checked">
            <Checkbox.Group>
                <Row>
                    {Object.entries(IBinaRentPros).map(([k, v]) => <Col key={k} span={8}>
                        <Checkbox value={k} style={{ lineHeight: '32px' }}>
                            {v}
                        </Checkbox>
                    </Col>)}
                </Row>
            </Checkbox.Group>
        </Form.Item>
    </>
}