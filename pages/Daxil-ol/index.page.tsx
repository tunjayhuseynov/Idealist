import { Button, Form, Input } from "antd"
import useError from "hooks/useError";
import useSign from "hooks/useSign";
import { useRouter } from "next/router";
import { useEffect } from "react";

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 18 },
};

const LogIn = () => {
    const { SignIn, error, status } = useSign()
    useError(error)

    const router = useRouter()

    useEffect(() => {
        if (status === "loggedIn") {
            router.push("/")
        }
    }, [status])

    return <div className="h-[calc(100vh-75px)] flex items-center justify-center">
        <div className="min-w-[350px] w-[75%] max-w-[600px]">
            <h3 className="text-xl font-semibold text-center mb-5 pl-10">Hesabınıza daxil olun</h3>
            <Form onFinish={SignIn} {...formItemLayout} className="w-full">
                <Form.Item label="E-mail" name="mail" rules={[
                    {
                        type: "email",
                        required: true,
                        message: "Mail düzgün daxil edilməyib"
                    }
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Şifrə" name="password" rules={[
                    {

                        required: true,
                        message: "Mail düzgün daxil edilməyib"
                    }
                ]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item wrapperCol={{ span: 1, offset: 11 }}>
                    <Button
                        htmlType="submit"
                        className="rounded-full mt-10 text-white hover:!text-white bg-primary hover:bg-primaryHover"
                    >
                        Daxil Ol
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </div>
}


export default LogIn