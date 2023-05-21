import React from "react";
import { Form, Checkbox, Row, Col } from "antd";
import { AutoAdditional, VehicleSupplies } from "types/category/consts/Auto";

const YaratSupply = () => {
  return (
    <Form.Item name="additional" label="Əlavə">
      <Checkbox.Group>
        <Row>
          {Object.entries(AutoAdditional).map(([key, value]) => {
            return (
              <Col key={key}>
                <Checkbox value={key} style={{ lineHeight: "32px" }}>
                  {value}?
                </Checkbox>
              </Col>
            );
          })}
        </Row>
      </Checkbox.Group>
    </Form.Item>
  );
};

export default YaratSupply;
