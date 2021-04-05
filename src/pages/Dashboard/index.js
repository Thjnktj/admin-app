import React from "react";
import { Card, Row, Col, Breadcrumb, Divider } from "antd";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";

function Dashboard() {
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Dasboard</Breadcrumb.Item>
      </Breadcrumb>
      <Divider orientation="left">Quản lý doanh thu</Divider>
      <Row gutter={[16, 24]} style={{ marginTop: "1rem" }}>
        <Col span={6}>
          <Card
            hoverable
            title="Card"
            style={{ width: "100%", minHeight: "180px", background: "green" }}
          ></Card>
        </Col>
        <Col span={6}>
          <Card
            hoverable
            title="Card"
            style={{ width: "100%", minHeight: "180px", background: "red" }}
          ></Card>
        </Col>
        <Col span={6}>
          <Card
            hoverable
            title="Card"
            style={{ width: "100%", minHeight: "180px", background: "yellow" }}
          ></Card>
        </Col>
        <Col span={6}>
          <Card
            hoverable
            title="Card"
            style={{ width: "100%", minHeight: "180px", background: "blue" }}
          ></Card>
        </Col>
      </Row>
    </>
  );
}

export default Dashboard;
