import React from "react";
import { Layout, Menu } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import "./index.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLogin } from "../../redux/actions";

const { Header, Content, Footer, Sider } = Layout;

function Sidebar(props) {
  const dispatch = useDispatch();
  const token = window.localStorage.token;
  const onClick = () => {
    dispatch(isLogin());
  };
  return (
    <>
      <Layout>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "fixed",
            left: 0,
          }}
        >
          <div className="logo">Admin LTE</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <NavLink to="/admin">Dasboard</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<VideoCameraOutlined />}>
              <NavLink to="/admin/cart">Đơn hàng</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<UploadOutlined />}>
              <NavLink to="/admin/product">Sản phẩm</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<BarChartOutlined />}>
              <NavLink to="/admin/category">Danh mục</NavLink>
            </Menu.Item>
            <Menu.Item key="5" icon={<CloudOutlined />}>
              <NavLink to="/admin/user">Khách hàng</NavLink>
            </Menu.Item>
            {token ? (
              <Menu.Item key="6" icon={<AppstoreOutlined />} onClick={onClick}>
                Thoát
              </Menu.Item>
            ) : (
              <Menu.Item key="6" icon={<AppstoreOutlined />}>
                <NavLink to="/admin/signin">Đăng nhập</NavLink>
              </Menu.Item>
            )}
          </Menu>
        </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
          <Header
            className="site-layout-background"
            style={{ padding: 0, background: "white" }}
          />
          <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
            <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: "76vh" }}
            >
              {props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Admin LTE ©2021 Created by Lê Đức Thịnh
          </Footer>
        </Layout>
      </Layout>
    </>
  );
}

export default Sidebar;
