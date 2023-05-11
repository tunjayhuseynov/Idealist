import React from "react";
import { Checkbox, Col, Form } from "antd";
import { AutoSituation } from "types/category/consts/Auto";

const YaratVeziyyet = () => {
  return (
    <>
      <Form.Item label="Vəziyyəti" name="Situation">
        <Checkbox.Group>
          <Col>
            {Object.entries(AutoSituation).map(([k, v]) => (
              <Checkbox key={k} value={k} style={{ lineHeight: "32px" }}>
                {v}
              </Checkbox>
            ))}
          </Col>
        </Checkbox.Group>
      </Form.Item>
    </>
  );
};

export default YaratVeziyyet;
