import React from "react";
import { Form, Checkbox, Row, Col } from "antd";
import { VehicleSupply } from "types/category/consts/Auto";

const { Item } = Form;
const { Group } = Checkbox;

const YaratSupply = () => {
  return (
    <Item name="vehicleSupply" label="Avtomobilin təchizatı">
      <Group>
        <Row>
          {Object.entries(VehicleSupply).map(([key, value]) => {
            return (
              <Col key={key} >
                <Checkbox value={key} style={{ lineHeight: "32px" }}>
                  {value}
                </Checkbox>
              </Col>
            );
          })}
        </Row>
      </Group>
    </Item>
  );
};

export default YaratSupply;
