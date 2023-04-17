import { Checkbox, Col, Form, Input, Radio, RadioChangeEvent, Row, Select } from "antd";
import CreateForm from "components/CreateForm/CreateForm";
import { Communal, IGenericBinaType, NearbyLocationNames, useBina } from "hooks/useBina";
import { AdminCrud } from "modules/Crud-Admin";
import { useState } from "react";
import type { IBinaDB } from "types/category/Bina";
import type { ICity } from "types/city";
import YaratTikil from "./Yarat.tikili";
import YaratTorpaq from "./Yarat.torpaq";


interface IProps {
    categories: IBinaDB[],
    cityList: ICity[]
}

export default function BinaYarat({ cityList, categories: BinaDB }: IProps) {
    const [selectedBina, setSelectedBina] = useState<IBinaDB>();
    const [isRenting, setIsRenting] = useState(false)

    const onCategoryChanged = (e: string) => {
        setSelectedBina(BinaDB?.find((bina) => bina.id === e))
    };

    const { onFinish } = useBina({ selectedBina })

    const onSellTypeChange = (e: RadioChangeEvent) => { if (e.target.value === "renting") setIsRenting(true); else setIsRenting(false) }

    return <>
        <CreateForm<IGenericBinaType> onFinish={onFinish} cityList={cityList} disableImageUpload>
            <Form.Item
                label="Əmlak növü"
                name="category"
                rules={[
                    {
                        required: true,
                        message: "Əmlak növü boşdur",
                    },
                ]}
            >
                <Select
                    onSelect={onCategoryChanged}
                    placeholder="Əmlak növü"
                >
                    {BinaDB?.map((bina) => {
                        return (
                            <Select.Option key={bina.id} value={bina.id}>
                                {bina.name}
                            </Select.Option>
                        );
                    })}
                </Select>
            </Form.Item>
            <Form.Item name="propertySellType" label="Satış tipi" rules={[{ required: true }]}>
                <Radio.Group onChange={onSellTypeChange}>
                    <Radio value="selling">Satılır</Radio>
                    <Radio value="renting">Kirayə verilir</Radio>
                </Radio.Group>
            </Form.Item>
            {selectedBina?.torpaq && <YaratTorpaq />}

            <Form.Item
                label="Yerin Sahəsi"
                name="areaSize"
                rules={[{
                    required: true,
                    message: 'Yerin Sahəsi boşdur',
                    validator: (_, value) => {
                        if (value && value > 0) {
                            return Promise.resolve();
                        } else {
                            return Promise.reject('Yerin Sahəsi 0-dan yuxarı olmalıdır');
                        }
                    }
                }]}
            >
                <Input type="number" placeholder="Yerin sahəsi" />
            </Form.Item>
            {selectedBina?.tikili && <YaratTikil buildingFloor={selectedBina.buildingFloor} renting={isRenting} />}
            <Form.Item name="nearbyLocations" label="Yaxınlıqda" valuePropName="checked">
                <Checkbox.Group>
                    <Row>
                        {Object.entries(NearbyLocationNames).map(([k, v]) => <Col key={k} span={8}>
                            <Checkbox value={k} style={{ lineHeight: '32px' }}>
                                {v}
                            </Checkbox>
                        </Col>)}
                    </Row>
                </Checkbox.Group>
            </Form.Item>
            <Form.Item name="communal" label="Kommunal xidmətlər" valuePropName="checked">
                <Checkbox.Group>
                    <Row>
                        {Object.entries(Communal).map(([k, v]) => <Col key={k} span={6}>
                            <Checkbox value={k} style={{ lineHeight: '32px' }}>
                                {v}
                            </Checkbox>
                        </Col>)}
                    </Row>
                </Checkbox.Group>
            </Form.Item>
            <Form.Item name="ownerType" label="Paylaşanın statusu" rules={[{ required: true }]}>
                <Radio.Group>
                    <Radio value="owner">Mülk sahibi</Radio>
                    <Radio value="agent">Vasitəçi</Radio>
                </Radio.Group>
            </Form.Item>
        </CreateForm>
    </>
}

export async function getStaticProps() {
    let categories = await new AdminCrud("dbBina").GetAll()
    let cityList = await new AdminCrud("cities").GetAll()

    return {
        props: {
            categories,
            cityList
        },
        revalidate: 3600
    }
}