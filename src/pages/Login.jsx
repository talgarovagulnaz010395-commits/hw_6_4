import { Form, Input, Button, Alert } from "antd";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";

function Login() {
    const { login, isLoading, error, isAuth } = useAuthStore();
    const navigate = useNavigate();

    const submit = async (data) => {
        const ok = await login(data);
        if (ok) navigate("/");
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
            <h2 style={{ color: "white" }}>Login</h2>

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

export default Login;
