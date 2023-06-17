import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, message } from "antd";

function RegistrationView() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const Navigate = useNavigate();

    const handleSubmit = (values) => {
        setLoading(true);
        const userRegistration = { ...values };
        console.log(userRegistration);

        axios.post('http://localhost:8080/api/users', userRegistration) // replace with your actual API URL
            .then(res => {
                localStorage.setItem('userId', res.data.id);
                localStorage.setItem('userName', res.data.username);
                message.success("Registration Successful!");
            })
            .catch(error => {
                if (error.response) {
                    message.error("Error in registration process.");
                }
            })
            .finally(() => {
                setLoading(false);
                Navigate('/');
            });
    };

    return (
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}

export default RegistrationView;
