import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Spin } from "antd";
import { useProductStore } from "../store/productStore";

export const ProductDetail = () => {
    const { id } = useParams();
    const { getProductById, productDetail, isLoading } =
        useProductStore();

    useEffect(() => {
        getProductById(id);
    }, [id]);

    if (isLoading) return <Spin style={{ margin: 50 }} />;

    if (!productDetail) return <div>Product not found</div>;

    return (
        <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
            <Card
                cover={
                    <img
                        src={productDetail.image}
                        alt={productDetail.title}
                        style={{
                            height: 300,
                            objectFit: "contain",
                            background: "#f5f5f5",
                            padding: 20,
                        }}
                    />
                }
            >
                <h1>{productDetail.title}</h1>
                <p>{productDetail.description}</p>
                <p>
                    <b>Price:</b> {productDetail.price}
                </p>
            </Card>
        </div>
    );
};
