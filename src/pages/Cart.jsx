import { useCartStore } from "../store/cartStore.js";
import { useEffect } from "react";
import { Button, Card, Col, Row, Space } from "antd";

export default function Cart() {
    const { cart, getCart, removeFromCart } = useCartStore();

    useEffect(() => {
        getCart();
    }, []);

    return (
        <div
            style={{
                padding: 20,
                minHeight: "calc(100vh - 64px)",
                background: "#f5f7fb",
            }}
        >
            <h2 style={{ marginBottom: 24, textAlign: "center" }}>
                Cart
            </h2>

            {cart?.length === 0 ? (
                <p style={{ textAlign: "center", color: "#888" }}>
                    Корзина пуста
                </p>
            ) : (
                <Row gutter={[16, 16]} justify="center">
                    {cart.map((item) => (
                        <Col key={item.product.id}>
                            <Card
                                hoverable
                                style={{
                                    width: 280,
                                    borderRadius: 12,
                                    boxShadow:
                                        "0 8px 24px rgba(0,0,0,0.06)",
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                }}
                                cover={
                                    <div
                                        style={{
                                            background: "#f3f4f6",
                                            padding: 10,
                                        }}
                                    >
                                        <img
                                            src={
                                                item.product.image ||
                                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSWuZKBQznAnHH12ISA0sKwxn-c5JkVQrAAeSGSid9tg&s"
                                            }
                                            alt={item.product.title}
                                            style={{
                                                height: 160,
                                                objectFit: "contain",
                                                width: "100%",
                                            }}
                                        />
                                    </div>
                                }
                            >
                                <h4
                                    style={{
                                        margin: "6px 0",
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                    }}
                                >
                                    {item.product.title}
                                </h4>

                                <p style={{ marginBottom: 8 }}>
                                    Quantity: {item.quantity}
                                </p>

                                <Space>
                                    <Button
                                        danger
                                        type="primary"
                                        block
                                        onClick={() =>
                                            removeFromCart(item.product.id)
                                        }
                                    >
                                        Delete
                                    </Button>
                                </Space>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}
