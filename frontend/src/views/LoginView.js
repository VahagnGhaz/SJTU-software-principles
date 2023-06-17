// LoginView.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Input, Button, message } from "antd";

function LoginView() {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const Navigate = useNavigate();

    const handleSubmit = (values) => {
        setLoading(true);
        const userAuth = { ...values };

        axios.post('http://localhost:8080/api/users/login', userAuth)
            .then(res => {
                localStorage.setItem('userId', res.data.id);
                localStorage.setItem('userName', res.data.username);
                localStorage.setItem('email', res.data.email);
                console.log(localStorage.getItem('userId'));
                console.log(localStorage.getItem('userName'));
                console.log(localStorage.getItem('email'));
                message.success("Login Successful!");
                Navigate('/');
            })
            .catch(error => {
                if (error.response) {
                    message.error("Unauthorized: Invalid username or password.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleRegister = () => {
        Navigate('/register');
    }

    return (
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Form.Item label="Username" name="username" rules={[{ required: true, message: 'Please input your username!' }]}>
                <Input />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading}>
                    Log in
                </Button>
            </Form.Item>
            
            <Form.Item>
                <Button type="link" onClick={handleRegister}>
                    Register
                </Button>
            </Form.Item>
        </Form>
    );
}

export default LoginView;
