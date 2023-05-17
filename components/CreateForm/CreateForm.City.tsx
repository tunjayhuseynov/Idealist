import { Form, FormInstance, Input, InputNumber, Select, Space } from "antd";
import { useState } from "react";
import { IToMetro } from "types/category/Common";
import { ICity, IRegion } from "types/city";
import { InputNumberFormatter, InputNumberParser } from "utils/inputs";
import { IComponentState } from "./types";

interface IProps {
    formInstance: FormInstance<any>,
    componentState?: IComponentState;
    cities: ICity[]
}

export default function CityForm({ formInstance: yaratForm, cities, componentState }: IProps) {
    const metroItem = Form.useWatch("metro", yaratForm)


    const [regions, setRegions] = useState<ICity["regions"]>();
    const [metros, setMetros] = useState<ICity["metros"]>();
    const [villages, setVillages] = useState<IRegion["villages"]>();

    const setCityRegions = (cityId: string) => {
        const city = cities.find((e) => e.id == cityId);
        setRegions(city?.regions);
        setMetros(city?.metros);
        yaratForm.setFieldValue("region", null);
        yaratForm.setFieldValue("metro", null);
        yaratForm.setFieldValue("village", null);
    };

    const setRegionVillages = (regionId: string) => {
        const region = regions?.[regionId];
        setVillages(region?.villages);
        yaratForm.setFieldValue("village", null);
    };

    return <>
        <Form.Item
            label="Şəhər"
            name="city"
            rules={[
                {
                    required: true,
                },
            ]}
        >
            <Select
                onSelect={(e) => {
                    setCityRegions(e);
                }}
                placeholder="Şəhər"
            >
                {cities?.map((city) => {
                    return (
                        <Select.Option key={city.id} value={city.id}>
                            {city.name}
                        </Select.Option>
                    );
                })}
            </Select>
        </Form.Item>

        {!(componentState?.disableRegionItem == true) &&
            Object.values(regions ?? {}).length > 0 && (
                <Form.Item
                    label="Rayon adı"
                    name="region"
                    rules={[
                        {
                            required: true,
                            message: "Rayon adı boşdur",
                        },
                    ]}
                >
                    <Select
                        onSelect={(e) => {
                            setRegionVillages(e);
                        }}
                        placeholder="Rayon"
                    >
                        {Object.values(regions ?? {})?.map((region) => {
                            return (
                                <Select.Option key={region.id} value={region.id}>
                                    {region.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            )}
        {!(componentState?.disableVillageItem == true) &&
            Object.values(villages ?? {}).length > 0 && (
                <Form.Item
                    label="Qəsəbə adı"
                    name="village"
                    rules={[
                        {
                            required: true,
                            message: "Qəsəbə adı boşdur",
                        },
                    ]}
                >
                    <Select placeholder="Qəsəbə">
                        {Object.values(villages ?? {})?.map((village) => {
                            return (
                                <Select.Option key={village.id} value={village.id}>
                                    {village.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            )}
        {!(componentState?.disableMetroItem) &&
            Object.values(metros ?? {}).length > 0 && (
                <Form.Item
                    label="Metro adı"
                    name="metro"
                    rules={[
                        {
                            required: true,
                            message: "Metro adı boşdur",

                        },
                    ]}
                >
                    <Select placeholder="Metro">
                        <Select.Option key={0} value={"noMetro"}>
                            Metro yoxdur
                        </Select.Option>
                        {Object.values(metros ?? {})?.map((metro) => {
                            return (
                                <Select.Option key={metro.id} value={metro.id}>
                                    {metro.name}
                                </Select.Option>
                            );
                        })}
                    </Select>
                </Form.Item>
            )}
        {(!componentState?.disableMetroItem && metroItem && metroItem !== "noMetro") && <Form.Item label="Metroya məsafə">
            <Space.Compact>
                <Form.Item
                    name={["toMetro", "transport"]}
                    noStyle
                    rules={[{ required: true, message: "Nə ilə?" }]}
                >
                    <Select placeholder="Nə ilə?" style={{ width: "40%" }}>
                        {Object.entries(IToMetro).map(([k, v]) => <Select.Option key={k} value={k}>{v}</Select.Option>)}
                    </Select>
                </Form.Item>
                <Form.Item
                    name={["toMetro", "minutes"]}
                    noStyle
                    rules={[{ required: true, message: "Neçə dəqiqə məsafədir?" }]}
                >
                    <InputNumber
                        className="w-full"
                        placeholder="Metroya olan dəqiqə"
                        addonAfter={"dəqiqə"}
                        formatter={InputNumberFormatter}
                        parser={InputNumberParser}
                    />
                </Form.Item>
            </Space.Compact>
        </Form.Item>}
    </>
}