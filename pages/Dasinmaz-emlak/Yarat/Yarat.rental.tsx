import { Checkbox, Col, Form, Radio, Row } from "antd";
import { BinaRentPropertyTypeOptions, IBinaRentNotAllowed, IBinaRentPros } from "hooks/useBina";
import { IRentDuration } from "types";

interface IProps {

}

export default function YaratRental({ }: IProps) {
    //No animal no child
    return <>
        <Form.Item name={["tikili", "rentalStatus", "rentDuration"]} label="Kirayə müddəti" rules={[{ required: true }]}>
            <Radio.Group>
                {Object.entries(IRentDuration).map(([k, v]) => <Radio value={k}>{v}</Radio>)}
            </Radio.Group>
        </Form.Item>
        <Form.Item name={["tikili", "rentalStatus", "rentPropertyType"]} label="Kirayə tipi" rules={[{ required: true }]}>
            <Radio.Group
                options={[...BinaRentPropertyTypeOptions]}
                optionType="button"
                defaultValue={"whole"}
                buttonStyle="solid"
            />
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
        <Form.Item name={["tikili", "rentalStatus", "rentNotAllowed"]} label="Qadağalar" valuePropName="checked">
            <Checkbox.Group>
                <Row>
                    {Object.entries(IBinaRentNotAllowed).map(([k, v]) => <Col key={k} span={8}>
                        <Checkbox value={k} style={{ lineHeight: '32px' }}>
                            {v}
                        </Checkbox>
                    </Col>)}
                </Row>
            </Checkbox.Group>
        </Form.Item>
    </>
}