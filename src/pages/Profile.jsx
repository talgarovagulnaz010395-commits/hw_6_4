import { useEffect, useState } from "react";
import { useAuthStore } from "../store/authStore";
import { useCategoryStore } from "../store/CategoryStore";
import { useNavigate } from "react-router-dom";
import { Space, Card, Button, List, Input, Spin, message } from "antd";

export default function Profile() {
    const { getProfile, profile, isAuth, logout } = useAuthStore();
    const { categories, getCategories, clearCategories, createCategory } = useCategoryStore();
    const navigate = useNavigate();

    const [newCategory, setNewCategory] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isAuth) {
            getProfile();
            getCategories();
        }
    }, [isAuth]);

    const handleLogout = () => {
        logout();
        clearCategories();
        navigate("/login");
        message.success("Вы вышли из аккаунта");
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;

        setLoading(true);
        try {
            await createCategory(newCategory);
            message.success("Категория создана");
            setNewCategory("");
        } catch (err) {
            message.error("Ошибка при создании категории");
        } finally {
            setLoading(false);
        }
    };

    if (!isAuth) return <p>Вы не авторизованы</p>;

    return (
        <div style={{ maxWidth: 600, margin: "0 auto", padding: 20 }}>
            <Space direction="vertical" size={20} style={{ width: "100%" }}>
                <Card
                    title="My Profile"
                    extra={
                        <Button type="primary" danger onClick={handleLogout}>
                            Log out
                        </Button>
                    }
                >
                    {!profile ? (
                        <Spin />
                    ) : (
                        <div>
                            <p><b>Username:</b> {profile.username}</p>
                            <p><b>Email:</b> {profile.email}</p>
                        </div>
                    )}
                </Card>

                <Card title="Categories">
                    <Space style={{ marginBottom: 16 } }>
                        <Input
                            placeholder="Введите название категории"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            onPressEnter={handleAddCategory}
                            disabled={loading}
                            style={{ width: "400px" }}
                        />
                        <Button type="primary" onClick={handleAddCategory} loading={loading}>
                            Add
                        </Button>
                    </Space>
                    {!categories ? (
                        <Spin />
                    ) : (
                        <List
                            dataSource={categories}
                            renderItem={(item) => <List.Item key={item.id}>{item.title}</List.Item>}
                        />
                    )}
                </Card>
            </Space>
        </div>
    );
}
