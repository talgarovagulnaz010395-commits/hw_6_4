import { Form, Input, Button, Alert } from "antd";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { login, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    const submit = async (data) => {
        const ok = await login(data);
        if (ok) navigate("/profile");
    };

    return (
        <Form
            onFinish={submit}
            style={{
                maxWidth: 380,
                margin: "60px auto",
                padding: 24,
                backgroundColor: "#ffffff",
                borderRadius: 12,
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
        >
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>Login</h2>

            {error && <Alert type="error" message={error} showIcon />}

            <Form.Item name="email" rules={[{ required: true, type: "email" }]}>
                <Input placeholder="Email" />
            </Form.Item>

            <Form.Item name="password" rules={[{ required: true }]}>
                <Input.Password placeholder="Password" />
            </Form.Item>

            <Button type="primary" htmlType="submit" loading={isLoading} block>
                Login
            </Button>
        </Form>
    );
}
