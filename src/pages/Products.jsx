import { useProductStore } from "../store/productStore";
import { useEffect, useState } from "react";
import { useCartStore } from "../store/cartStore.js";
import { Card, Col, Row, Space, Button, Form, Input, message } from "antd";
import {useNavigate} from "react-router-dom";


export const Products = () => {
    const { products, getProducts, createProduct, isLoading } = useProductStore();
    const { addToCart } = useCartStore();
    const [isCreating, setIsCreating] = useState(false);
    const navigate = useNavigate();

    const [form] = Form.useForm();

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const handleCreateProduct = async (values) => {
        setIsCreating(true);
        await createProduct(values);
        message.success("Продукт создан");
        form.resetFields();
        await getProducts();
        setIsCreating(false);
    };

    if (isLoading) return <p>Loading products...</p>;

    return (
        <div
            style={{
                padding: 20,
                minHeight: "calc(100vh - 64px)",
                background: "#f5f7fb",
            }}
        >
            <h1 style={{ marginBottom: 24, textAlign: "center" }}>Products</h1>

            <Card
                title="Создать продукт"
                style={{ maxWidth: 600, margin: "0 auto 20px", borderRadius: 12 }}
            >
                <Form form={form} layout="vertical" onFinish={handleCreateProduct}>
                    <Form.Item
                        label="Название"
                        name="title"
                        rules={[{ required: true, message: "Введите название продукта" }]}
                    >
                        <Input placeholder="Название продукта" />
                    </Form.Item>
                    {/*<Form.Item label="Введите категорию" name="category">*/}
                    {/*    <Input placeholder="Категория" />*/}
                    {/*</Form.Item>*/}

                    <Form.Item
                        label="Описание"
                        name="description"
                        rules={[{ required: true, message: "Введите описание продукта" }]}
                    >
                        <Input.TextArea placeholder="Описание продукта" rows={3} />
                    </Form.Item>
                    <Form.Item label="Введите цену продукта" name="price">
                        <Input placeholder="цена" />
                    </Form.Item>

                    <Form.Item label="Ссылка на изображение" name="image">
                        <Input placeholder="URL изображения" />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" loading={isCreating}>
                        Создать продукт
                    </Button>
                </Form>
            </Card>

            <Row gutter={[16, 16]}>
                {products.map((p) => (
                    <Col key={p.id} xs={24} sm={12} md={6}>
                        <Card
                            hoverable
                            style={{
                                height: 400,
                                borderRadius: 12,
                                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                            title={p.title}
                            onClick={() => navigate(`/products/${p.id}`)}
                            cover={
                                <div style={{ background: "#f3f4f6", padding: 10 }}>
                                    <img
                                        src={p.image || "https://thumbs.dreamstime.com/b/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available-236105299.jpg"}
                                        alt={p.title}
                                        style={{
                                            height: 180,
                                            objectFit: "contain",
                                            width: "100%",
                                        }}
                                    />
                                </div>
                            }
                        >
                            <p
                                style={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 1,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    marginBottom: 6,
                                }}
                            >
                                {p.description}
                            </p>


                            <p style={{ marginBottom: 8 }}>
                                <b>Category:</b>{" "}
                                {Array.isArray(p.categories)
                                    ? p.categories.map((c) => c.title).join(", ")
                                    : p.categories?.title || "Нет категории"}
                            </p>

                            <Space>
                                <Button type="primary" block onClick={(e) => {
                                    e.stopPropagation();
                                    addToCart(p.id)
                                }}>
                                    Add to cart
                                </Button>
                            </Space>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};
