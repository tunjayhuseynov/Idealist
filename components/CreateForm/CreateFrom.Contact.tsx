import { Checkbox, Form, Input } from "antd";
import useFormFunctions from "hooks/useFormFunctions";


export default function ContactForm() {
    const { NumberPrefixes } = useFormFunctions();
    return <>
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
                    rules={[
                        {
                            required: true,
                            message: "Nömrənin əvvəli (prefiks) seçilməyib",
                        },
                    ]}
                >
                    {NumberPrefixes}
                </Form.Item>
                <Form.Item
                    name={["phone", "number"]}
                    rules={[
                        { required: true, message: "Mobil nömrə qeyd olunmayıb" },
                    ]}
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
    </>
}