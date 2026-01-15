import { Form, Input, Button, Alert } from "antd";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { register, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const submit = async (data) => {
        const ok = await register(data);
        if (ok) navigate("/login");
    };

    return (
        <Form
            onFinish={submit}
            style={{
                maxWidth: "350px",
                margin: "20px auto",
                padding: "10px",
                backgroundColor: "#1F2937",
                color: "#fff",
                borderRadius: "10px",
            }}
        >
            <h2 style={{ color: "white" }}>Register</h2>

            {error && <Alert type="error" message={error} showIcon />}

            <Form.Item name="username" rules={[{ required: true }]}>
                <Input placeholder="Username" />
            </Form.Item>

            <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
                <Input placeholder="Email" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true }]}>
                <Input.Password placeholder="Password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={isLoading} block>
                Register
            </Button>
        </Form>
    );
}
