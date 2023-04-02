import { Button, Form, Input } from "antd";
import useError from "hooks/useError";
import useSign from "hooks/useSign";
import { useRouter } from "next/router";
import { useEffect } from "react";

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};


export default function Registration() {
    const { SignUp, error, status } = useSign()
    useError(error)

    const router = useRouter()

    useEffect(() => {
        if (status === "loggedIn") {
            router.push("/")
        }
    }, [status])

    return (
        <>
            <Form onFinish={SignUp} {...formItemLayout}>
                <Form.Item label="E-mail" name="mail" rules={[
                    {
                        type: "email",
                        required: true,
                        message: "Mail düzgün daxil edilməyib"
                    }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Şifrə"
                    rules={[
                        {
                            required: true,
                            message: 'Zəhmət olmasa şifrəni daxil edin!',
                        },
                    ]}
                    hasFeedback
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Şifrəni təkrarla"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                        {
                            required: true,
                            message: 'Zəhmət olmasa şifrəni təsdiqlətin!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('Fərqli şifrələr daxil etmisiniz!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 1, offset: 11 }}>
                    <Button
                        htmlType="submit"
                        className="rounded-full mt-10 text-white hover:!text-white bg-primary hover:bg-primaryHover"
                    >
                        Üzv ol
                    </Button>
                </Form.Item>
            </Form>
        </>
    )
}