"use client";

import React, { useState } from "react";
import type { ICity } from "types/city";
import type { IAutoDB, IAutoMark } from "types/category/Auto";
import CreateForm from "components/CreateForm/CreateForm";
import { Checkbox, Form, Input, InputNumber, Radio, Select, Space } from "antd";
import { IGenericAutoType, useAuto } from "hooks/useAuto";
import { IComponentState } from "components/CreateForm/types";
import {
  AutoBansType,
  AutoColours,
  AutoFuelType,
  AutoGearBox,
  AutoGearType,
  AutoMarket,
} from "types/category/consts/Auto";
import YaratVeziyyet from "./Yarat.Veziyyet";
import YaratSupply from "./Yarat.Supply";

const { Option } = Select;
interface IProps {
  categories: IAutoDB[];
  cityList: ICity[];
  yearsArray: number[];
  engineCapacutyArray: number[];
}

const componentState: IComponentState = {
  disableTitleItem: true,
  disableMapItem: true,
  disableRegionItem: true,
  disableMetroItem: true,
  disableVillageItem: true,
};

export default function NeqliyatYarat({
  cityList,
  categories: NeqliyatDB,
  yearsArray,
  engineCapacutyArray,
}: IProps) {
  const [selectedAuto, setSelectedAuto] = useState<IAutoDB>();
  const [selectedMark, setSelectedMark] = useState<IAutoMark>();

  const onCategoryChanged = (e: number) => {
    setSelectedAuto(NeqliyatDB?.find((neqliyat) => neqliyat.id === e));
  };

  const onMarkChanged = (e: string) => {
    setSelectedMark(selectedAuto?.marks?.find((mark) => mark.name === e));
  };

  const { onFinish } = useAuto({ selectedAuto });

  return (
    <>
      <CreateForm<IGenericAutoType>
        componentState={componentState}
        cityList={cityList}
        onFinish={onFinish}
      >
        <Form.Item
          label="Nəqliyyat növü"
          name="category"
          rules={[
            {
              required: true,
              message: "Nəqliyyat növü boşdur",
            },
          ]}
        >
          <Select onSelect={onCategoryChanged} placeholder="Nəqliyyat növü">
            {NeqliyatDB?.map((neqliyat) => {
              return (
                <Option key={neqliyat.id} value={neqliyat.id}>
                  {neqliyat.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="İl"
          name="year"
          rules={[
            {
              required: true,
              message: "İl boşdur",
            },
          ]}
        >
          <Select placeholder="İl">
            {yearsArray.map((year) => {
              return (
                <Option key={year} value={year}>
                  {year}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item rules={[{}]} label="VIN-kod" name="VIN">
          <Input
            style={{
              textTransform: "uppercase",
            }}
          />
        </Form.Item>
        {selectedAuto?.marks && (
          <>
            <Form.Item
              label="Marka"
              name="mark"
              rules={[
                {
                  required: true,
                  message: "Marka boşdur",
                },
              ]}
            >
              <Select onChange={onMarkChanged} placeholder="Marka">
                {selectedAuto.marks.map((auto) => {
                  return (
                    <Option key={auto.name} value={auto.name}>
                      {auto.name}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            {selectedMark?.models && (
              <Form.Item
                label="Model"
                name="model"
                rules={[
                  {
                    required: true,
                    message: "Model boşdur",
                  },
                ]}
              >
                <Select>
                  {selectedMark.models.map((model) => {
                    return (
                      <Option key={model.name} value={model.name}>
                        {model.title}
                        {model.title && model.name ? "," : ""} {model.name}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            )}
            <Form.Item
              label="Ban növü"
              name="banType"
              rules={[
                {
                  required: true,
                  message: "Ban növü boşdur",
                },
              ]}
            >
              <Select placeholder="Ban növü">
                {Object.entries(AutoBansType).map(([key, banType]) => {
                  return (
                    <Option key={key} value={key}>
                      {banType}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            {selectedAuto.mileage && (
              <Form.Item label="Yürüş" required>
                <Form.Item
                  name={["mileage", "number"]}
                  noStyle
                  rules={[
                    { required: true, message: "Yürüş boşdur", type: "number" },
                  ]}
                >
                  <InputNumber
                    type="number"
                    min={0}
                    style={{ width: "40%", marginRight: "0.5rem" }}
                  />
                </Form.Item>
                <Form.Item
                  name={["mileage", "measure"]}
                  noStyle
                  rules={[{ required: true, message: "" }]}
                >
                  <Radio.Group>
                    <Radio value="km">km</Radio>
                    <Radio value="ml">ml</Radio>
                  </Radio.Group>
                </Form.Item>
              </Form.Item>
            )}
            <Form.Item
              label="Rəng"
              name="colour"
              rules={[
                {
                  required: true,
                  message: "Rəng boşdur",
                },
              ]}
            >
              <Select placeholder="Rəng">
                {Object.entries(AutoColours).map(([key, colour]) => {
                  return (
                    <Option key={key} value={key}>
                      {colour}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Neçənci sahibisiniz?" name="ownerNo">
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Neçənci sahibisiniz?"
                min={1}
                addonAfter="ci"
              />
            </Form.Item>
            {selectedAuto.fuel && (
              <Form.Item
                label="Yanacaq növü"
                name="fuelType"
                rules={[
                  {
                    required: true,
                    message: "Yanacaq növü boşdur",
                  },
                ]}
              >
                <Select placeholder="Yanacaq növü">
                  {Object.entries(AutoFuelType).map(([key, fuel]) => {
                    return (
                      <Option key={key} value={key}>
                        {fuel}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            )}
            <Form.Item
              label="Ötürücü növü"
              name="gearType"
              rules={[
                {
                  required: true,
                  message: "Ötürücü növü boşdur",
                },
              ]}
            >
              <Select placeholder="Ötürücü növü">
                {Object.entries(AutoGearType).map(([key, gear]) => {
                  return (
                    <Option key={key} value={key}>
                      {gear}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Sürətlər qutusu"
              name="gearBox"
              rules={[
                {
                  required: true,
                  message: "Sürətlər qutusu boşdur",
                },
              ]}
            >
              <Select placeholder="Sürətlər qutusu ">
                {Object.entries(AutoGearBox).map(([key, gearBox]) => {
                  return (
                    <Option key={key} value={key}>
                      {gearBox}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            {selectedAuto.capacity && (
              <Form.Item
                label={
                  <p>
                    Mühərrikin həcmi sm<sup>3</sup>{" "}
                  </p>
                }
                name="engineCapacity"
                rules={[
                  {
                    required: true,
                    message: "Mühərrikin həcmi boşdur",
                  },
                ]}
              >
                <Select placeholder="Mühərrikin həcmi">
                  {engineCapacutyArray.map((capacity) => {
                    return (
                      <Option key={capacity} value={capacity}>
                        {capacity}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            )}
            <Form.Item
              label="Mühərrikin gücü, a.g."
              name="enginePower"
              rules={[
                {
                  required: true,
                  message: "Mühərrikin həcmi boşdur",
                },
              ]}
            >
              <InputNumber
                style={{ width: "100%" }}
                placeholder="Mühərrikin gücü, a.g."
                min={1}
              />
            </Form.Item>
            <Form.Item label="Hansı bazar üçün yığılıb" name="market">
              <Select placeholder="Hansı bazar üçün yığılıb">
                {Object.entries(AutoMarket).map(([key, market]) => {
                  return (
                    <Option key={key} value={key}>
                      {market}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <YaratVeziyyet />
            <Form.Item label="Yerlərin sayı" name="numberOFfseats">
              <Select placeholder="Yerlərin sayı">
                <Option key="notMentioned" value="notMentioned">
                  Qeyd olunmasın
                </Option>
                {[1, 2, 3, 4, 5, 6, 7].map((num) => {
                  return (
                    <Option key={num} value={num}>
                      {num}
                    </Option>
                  );
                })}
                <Option key="8+" value="8+">
                  8+
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="isOnCredit"
              valuePropName="checked"
              label="Kreditdədir?"
              initialValue={false}
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name="isBarter"
              valuePropName="checked"
              label="Barter mümkündür?"
              initialValue={false}
            >
              <Checkbox></Checkbox>
            </Form.Item>

            {selectedAuto.withSupplies ?? <YaratSupply />}
          </>
        )}
      </CreateForm>
    </>
  );
}
