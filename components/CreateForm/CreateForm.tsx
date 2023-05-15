import {
  Form,
  Input,
  Select,
  Button,
  UploadFile,
  Modal,
  InputNumber,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Currency, IToMetro } from "types/category/Common";
import { useRef, useState } from "react";
import type { ICreateFormProps } from "./types";
import useFormFunctions from "../../hooks/useFormFunctions";
import { auth } from "fb";
import UploadImages from "./Components/UploadImages";
import useError from "hooks/useError";
import GoogleMaps from "./Components/GoogleMaps";
import ContactForm from "./CreateFrom.Contact";
import CityForm from "./CreateForm.City";
import { v1 as uuid } from 'uuid';
import { InputNumberFormatter, InputNumberParser } from "utils/inputs";

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
}: ICreateFormProps<T>) => {
  const { uploadImages } = useFormFunctions();
  const [error, setError] = useState<Error>();

  const [isGoogleMapModalOpen, setIsGoogleMapModalOpen] = useState(false);

  const [yaratForm] = Form.useForm();


  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  const [mapButtonClickCount, setMapButtonClickCount] = useState<number>(0);
  const mapButtonRef = useRef<HTMLButtonElement>(null);

  useError(error);

  const OnFinishFn = async (values: any) => {
    try {
      const id = uuid();
      const images =
        disableImageUpload === true
          ? []
          : await uploadImages(fileList, id, auth);

      await onFinish(values, cities, images, id, { lat, lng });

      alert("Done");
    } catch (error) {
      console.error(error);
      setError(new Error("Nəsə düzgen etmədi.\nYenidən cəht edin."));
    }
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
                {Object.values(Currency).map((currency) => {
                  return (
                    <Select.Option key={currency} value={currency}>
                      {currency}
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
              <InputNumber
                className="w-full"
                placeholder="Qiymət"
                formatter={InputNumberFormatter}
                parser={InputNumberParser}
              />
            </Form.Item>
            <CityForm formInstance={yaratForm} cities={cities} componentState={componentState} />
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
            <ContactForm />
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
