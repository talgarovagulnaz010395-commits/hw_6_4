import React from "react";
import { Layout, Menu, Badge } from "antd";
import { ShoppingCartOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import styles from "../header.module.css";

const { Header } = Layout;

const AppHeader = ({ cartCount = 0 }) => {
    return (
        <Header className={styles.header} >
            <div className={styles.logo}>
                <Link to="/">MyShop</Link>
            </div>

            <Menu mode="horizontal" className={styles.menu} >
                <Menu.Item key="products">
                    <Link to="/products">Products</Link>
                </Menu.Item>

                <Menu.Item key="cart">
                    <Link to="/cart">
                        <Badge count={cartCount} offset={[6, -4]}>
                            <ShoppingCartOutlined className={styles.icon} />
                        </Badge>
                        <span>Cart</span>
                    </Link>
                </Menu.Item>

                <Menu.Item key="profile">
                    <Link to="/profile">
                        <UserOutlined className={styles.icon} />
                        <span>Profile</span>
                    </Link>
                </Menu.Item>
            </Menu>
        </Header>
    );
};

export default AppHeader;
