import { useAuthStore } from "../store/authStore";
import { useCategoryStore } from "../store/CategoryStore";
import { useNavigate } from "react-router-dom";
import { Card, Button, List, Spin, message, Space, Input } from "antd";
import { useEffect, useState } from "react";

export default function Profile() {
    const { user, logout, isLoading } = useAuthStore();
    const { categories, getCategories, clearCategories, createCategory } =
        useCategoryStore();

    const navigate = useNavigate();
    const [newCategory, setNewCategory] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    const handleLogout = () => {
        logout();
        clearCategories();
        message.success("Вы вышли из аккаунта");
        navigate("/login");
    };

    const handleAddCategory = async () => {
        if (!newCategory.trim()) return;

        setIsCreating(true);
        try {
            await createCategory(newCategory);
            await getCategories();
            message.success("Категория создана");
            setNewCategory("");
        } catch {
            message.error("Ошибка при создании категории");
        } finally {
            setIsCreating(false);
        }
    };

    if (isLoading && !user) {
        return <Spin tip="Загрузка профиля..." />;
    }

    return (
        <div
            style={{
                maxWidth: 600,
                margin: "60px auto",
                padding: 24,
                backgroundColor: "#ffffff",
                borderRadius: 12,
                boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
            }}
        >
            <Space orientation="vertical" size={20} style={{ width: "100%" }}>
                <Card
                    title="My Profile"
                    style={{ borderRadius: 12 }}
                    extra={
                        <Button danger type="primary" onClick={handleLogout}>
                            Log out
                        </Button>
                    }
                >
                    {user ? (
                        <>
                            <p>
                                <b>Username:</b> {user.username}
                            </p>
                            <p>
                                <b>Email:</b> {user.email}
                            </p>
                        </>
                    ) : (
                        <Spin />
                    )}
                </Card>

                <Card title="Categories" style={{ borderRadius: 12 }}>
                    <Space style={{ marginBottom: 16 }}>
                        <Input
                            placeholder="Введите название категории"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                            onPressEnter={handleAddCategory}
                            disabled={isCreating}
                            style={{ width: 400 }}
                        />
                        <Button
                            type="primary"
                            onClick={handleAddCategory}
                            loading={isCreating}
                        >
                            Add
                        </Button>
                    </Space>

                    {categories.length === 0 ? (
                        <p>Категорий нет</p>
                    ) : (
                        <List
                            dataSource={categories}
                            renderItem={(category) => (
                                <List.Item key={category.id}>
                                    {category.title}
                                </List.Item>
                            )}
                        />
                    )}
                </Card>
            </Space>
        </div>
    );
}
