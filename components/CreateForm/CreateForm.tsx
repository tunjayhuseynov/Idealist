import { Form, Input, Select, Checkbox, Button, Upload, UploadFile } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Currency } from "types/category/Common";
import { useState } from "react";
import { Crud } from "modules/Crud";
import useAsyncEffect from "hooks/useAsyncEffect";
import { UploadOutlined } from '@ant-design/icons';
import type { DragEndEvent } from '@dnd-kit/core';
import { DndContext, PointerSensor, useSensor } from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { ICity, IProps } from "./types";
import { DraggableUploadListItem } from "./DraggableListItem";
import { uploadImages } from "./CreateForm_Functions";

const { TextArea } = Input;


const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
};

const CreateForm = <T,>({ children, componentState, onFinish }: IProps<T>) => {
    const [cities, setCities] = useState<ICity[]>([]);
    const citiesDb = new Crud<ICity>("cities");

    const [fileList, setFileList] = useState<UploadFile[]>([]);

    useAsyncEffect(async () => {
        const respCities = await citiesDb.GetAll();
        setCities(respCities);
    }, [])


    const selectNumBefore = (
        <Select>
            <Select.Option value="070">070</Select.Option>
            <Select.Option value="077">077</Select.Option>
            <Select.Option value="055">055</Select.Option>
            <Select.Option value="050">050</Select.Option>
            <Select.Option value="051">051</Select.Option>
        </Select>
    );

    const sensor = useSensor(PointerSensor, {
        activationConstraint: { distance: 10 },
    });

    const onDragEnd = ({ active, over }: DragEndEvent) => {
        if (active.id !== over?.id) {
            setFileList((prev) => {
                const activeIndex = prev.findIndex((i) => i.uid === active.id);
                const overIndex = prev.findIndex((i) => i.uid === over?.id);
                return arrayMove(prev, activeIndex, overIndex);
            });
        }
    };



    return (
        <div className="mx-auto my-20 p-8 bg-white rounded-lg shadow-lg">
            <div className="mt-8 grid grid-cols-[65%,35%]">
                <div className="rounded p-6">
                    <Form {...formItemLayout} onFinish={(values) => onFinish(values, cities, fileList, uploadImages)}>
                        {!(componentState?.disableTitleItem == true) &&
                            <Form.Item
                                label="Elanın adı"
                                name="title"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Elanın adı boşdur'
                                    },
                                ]}
                            >
                                <Input placeholder="Elanın adı" />
                            </Form.Item>
                        }
                        {children}
                        <Form.Item
                            label="Məzmun"
                            name="about"
                            rules={[
                                {
                                    required: true,
                                    message: 'Məzmun boşdur'
                                }
                            ]}
                        >
                            <TextArea showCount maxLength={3000} />
                        </Form.Item>
                        <Form.Item
                            label="Valyuta"
                            name="currency"
                            rules={[{
                                required: true
                            }]}
                        >
                            <Select placeholder="Valyuta">
                                {Object.values(Currency).map((cur) => {
                                    return <Select.Option key={cur} value={cur}>
                                        {cur}
                                    </Select.Option>
                                })}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Qiymət"
                            name="price"
                            rules={[{
                                required: true,
                                message: 'Qiymət boşdur'
                            }]}
                        >
                            <Input type="number" placeholder="Qiymət" />
                        </Form.Item>
                        <Form.Item
                            label="Şəhər"
                            name="city"
                            rules={[{
                                required: true
                            }]}
                        >
                            <Select placeholder="Şəhər">
                                {cities?.map((city) => {
                                    return <Select.Option key={city.name} value={city.id}>
                                        {city.name}
                                    </Select.Option>
                                })}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="upload"
                            label="Şəkillər"
                            rules={[
                                {
                                    message: 'Şəkil əlavə olunmalıdır',
                                    required: true,
                                    validator: (_, value) => {
                                        if (fileList.length > 2) {
                                            return Promise.resolve();
                                        } else {
                                            return Promise.reject('Şəkil əlavə olunmalıdır');
                                        }
                                    }
                                }
                            ]}
                            extra={
                                <div>
                                    <div className="text-sm text-gray-500">Şəkil sıralaması yuxarıdan aşağıdır. Dəyişmək üçün sürüşdürün</div>
                                    <div className="text-sm text-gray-500">Şəkil sayı ən az 3 və ən çox 15 olmalıdır</div>
                                </div>
                            }
                        >
                            <DndContext sensors={[sensor]} onDragEnd={onDragEnd} data-fileList={fileList}>
                                <SortableContext items={fileList.map((i) => i.uid)} strategy={verticalListSortingStrategy}>
                                    <Upload
                                        name="logo"
                                        listType="picture"
                                        maxCount={15}
                                        multiple
                                        fileList={fileList}
                                        previewFile={async (file) => {
                                            return URL.createObjectURL(file)
                                        }}
                                        iconRender={(file) => {
                                            return <img src={URL.createObjectURL(file as any)} />
                                        }}
                                        onRemove={(file) => {
                                            setFileList(fileList.filter((i) => i.uid !== file.uid))
                                        }}
                                        itemRender={(originNode, file) => (
                                            <DraggableUploadListItem originNode={originNode} file={file} />
                                        )}
                                        beforeUpload={(file, files) => {
                                            setFileList([...fileList, ...files])
                                            return false
                                        }}>
                                        <Button icon={<UploadOutlined />}>Şəkil əlavə et</Button>
                                    </Upload>
                                </SortableContext>
                            </DndContext>
                        </Form.Item>

                        <Form.Item
                            className="mt-20"
                            label="Əlaqə adı"
                            name="contactName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Əlaqə adı boşdur'
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
                                    message: 'Email adı boşdur'

                                },
                            ]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            label="Mobil nömrə"
                            name='phone'
                            rules={[
                                {
                                    required: true,
                                    message: 'Mobil nömrə boşdur'

                                },
                            ]}
                        >
                            <Input.Group compact>
                                <Form.Item
                                    name={['phone', 'prefix']}
                                    initialValue={"050"}
                                    noStyle
                                    rules={[{ required: true, message: 'Prefix is required' }]}
                                >
                                    {selectNumBefore}
                                </Form.Item>
                                <Form.Item
                                    name={['phone', 'number']}
                                    rules={[{ required: true, message: 'Number is required' }]}
                                >
                                    <Input type="number"
                                        pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
                                        placeholder="XXX-XX-XX" />
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
        </div >
    )
}

export default CreateForm;


