import { Form, Input, Select, Checkbox, Button, UploadFile, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Currency } from "types/category/Common";
import { useEffect, useRef, useState } from "react";
import type { IProps } from "./types";
import useFormFunctions from "../../hooks/useFormFunctions";
import { auth } from "fb";
import UploadImages from "./Components/UploadImages";
import useError from "hooks/useError";
import type { ICity, IRegion } from "types/city";
import GoogleMaps from "./Components/GoogleMaps";

const { TextArea } = Input;

const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

const CreateForm = <T,>({
  children,
  componentState,
  onFinish,
  cityList: cities,
  disableImageUpload,
}: IProps<T>) => {
  const { uploadImages, NumberPrefixes } = useFormFunctions();
  const [error, setError] = useState<Error>();

  const [isGoogleMapModalOpen, setIsGoogleMapModalOpen] = useState(false);

  const [yaratForm] = Form.useForm();

  const [regions, setRegions] = useState<ICity["regions"]>();
  const [metros, setMetros] = useState<ICity["metros"]>();
  const [villages, setVillages] = useState<IRegion["villages"]>();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  const [mapButtonClickCount, setMapButtonClickCount] = useState<number>(0);
  const mapButtonRef = useRef<HTMLButtonElement>(null);

  useError(error);

  const OnFinishFn = async (values: any) => {
    try {
      const id = crypto.randomUUID();
      const images =
        disableImageUpload === true
          ? []
          : await uploadImages(fileList, id, auth);

      await onFinish(values, cities, images, id, lat, lng);

      alert("Done");
    } catch (error) {
      console.error(error);
      setError(new Error("Nəsə düzgen etmədi.\nYenidən cəht edin."));
    }
  };

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

  const selectMarkerCordinates = (e: google.maps.MapMouseEvent) => {
    setLat(e.latLng?.lat() ?? 0);
    setLng(e.latLng?.lng() ?? 0);
  };

  return (
    <div className="mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
      <div className="mt-8 grid grid-cols-[65%,35%]">
        <div className="rounded p-6">
          <Form {...formItemLayout} onFinish={OnFinishFn} form={yaratForm}>
            {!(componentState?.disableTitleItem == true) && (
              <Form.Item
                label="Elanın adı"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Elanın adı boşdur",
                  },
                ]}
              >
                <Input placeholder="Elanın adı" />
              </Form.Item>
            )}
            {children}
            <Form.Item
              label="Məzmun"
              name="about"
              rules={[
                {
                  required: true,
                  message: "Məzmun boşdur",
                },
              ]}
            >
              <TextArea showCount maxLength={3000} />
            </Form.Item>
            <Form.Item
              label="Valyuta"
              name="currency"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Valyuta">
                {Object.values(Currency).map((cur) => {
                  return (
                    <Select.Option key={cur} value={cur}>
                      {cur}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              label="Qiymət"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Qiymət boşdur",
                },
              ]}
            >
              <Input type="number" placeholder="Qiymət" />
            </Form.Item>
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
                    <Select.Option key={city.name} value={city.id}>
                      {city.name}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            {!(componentState?.disableTitleItem == true) && (
              <div className="w-full flex justify-center mb-5">
                {mapButtonClickCount < 3 ? (
                  <button
                    className="rounded-full p-2 mt-5 text-white hover:!text-white bg-primary hover:bg-primaryHover"
                    onClick={() => {
                      setIsGoogleMapModalOpen(true);
                      setMapButtonClickCount(mapButtonClickCount + 1);
                    }}
                    type="button"
                    ref={mapButtonRef}
                  >
                    Xəritədə göstərmək
                  </button>
                ) : (
                  <span>Xəritəyə baxmaq üçün səhifəni yeniləyin</span>
                )}
              </div>
            )}
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
                        <Select.Option key={region.name} value={region.id}>
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
                        <Select.Option key={village.name} value={village.id}>
                          {village.name}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              )}
             {!(componentState?.disableMetroItem == true) &&
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
                    <Select.Option key={0} value={"Yoxdur"}>
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
            <Form.Item
              name="upload"
              label="Şəkillər"
              rules={[
                {
                  message: "Şəkil əlavə olunmalıdır",
                  required: true,
                  validator: (_, value) => {
                    if (fileList.length > 2) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject("Şəkil əlavə olunmalıdır");
                    }
                  },
                },
              ]}
              extra={
                <div>
                  <div className="text-sm text-gray-500">
                    Şəkil sıralaması yuxarıdan aşağıdır. Dəyişmək üçün
                    sürüşdürün
                  </div>
                  <div className="text-sm text-gray-500">
                    Şəkil sayı ən az 3 və ən çox 15 olmalıdır
                  </div>
                </div>
              }
            >
              <UploadImages fileState={[fileList, setFileList]} />
            </Form.Item>
            <Form.Item
              className="mt-20"
              label="Əlaqə adı"
              name="contactName"
              rules={[
                {
                  required: true,
                  message: "Əlaqə adı boşdur",
                },
              ]}
            >
              <Input placeholder="Əlaqə adı" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Email adı boşdur",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Mobil nömrə"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Mobil nömrə boşdur",
                },
              ]}
            >
              <Input.Group compact>
                <Form.Item
                  name={["phone", "prefix"]}
                  initialValue={"050"}
                  noStyle
                  rules={[{ required: true, message: "Prefix is required" }]}
                >
                  {NumberPrefixes}
                </Form.Item>
                <Form.Item
                  name={["phone", "number"]}
                  rules={[{ required: true, message: "Number is required" }]}
                >
                  <Input
                    type="number"
                    pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
                    placeholder="XXX-XX-XX"
                  />
                </Form.Item>
              </Input.Group>
            </Form.Item>
            <Form.Item
              name="isWp"
              valuePropName="checked"
              initialValue={false}
              label="WhatsApp?"
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item
              name="isCall"
              valuePropName="checked"
              label="Zəng?"
              initialValue={false}
            >
              <Checkbox></Checkbox>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                className="rounded-full flex items-center float-right mt-10 text-white hover:!text-white bg-primary hover:bg-primaryHover"
              >
                <PlusOutlined /> Elanı əlavə et
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      {!(componentState?.disableTitleItem == true) && (
        <Modal
          title="Xəritə"
          footer={null}
          centered
          width={1000}
          open={isGoogleMapModalOpen}
          onOk={() => setIsGoogleMapModalOpen(false)}
          onCancel={() => setIsGoogleMapModalOpen(false)}
        >
          <GoogleMaps
            selectMarkerCordinates={selectMarkerCordinates}
            lat={lat}
            lng={lng}
          />
        </Modal>
      )}
    </div>
  );
};

export default CreateForm;
