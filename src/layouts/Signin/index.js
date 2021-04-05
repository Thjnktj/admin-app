import React from "react";

import {
  Form,
  Input,
  Button,
  Checkbox,
  Divider,
  Row,
  Col,
  message,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions";
import { Redirect } from "react-router";

function Signin() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const onFinish = (values) => {
    dispatch(login(values));
  };

  const key = "updatable";
  if (auth.authenticate) {
    setTimeout(() => {
      message.success({ content: "Đăng nhập thành công", key, duration: 2 });
    }, 1000);
    return <Redirect to="/admin" />;
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Divider orientation="left">Đăng nhập</Divider>
      <Row gutter={[8, 24]}>
        <Col span={18}>
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email không đúng định dạng!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  min: 6,
                  required: true,
                  message: "Mật khẩu ít nhất 6 kí tự!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item {...tailLayout} name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
}

export default Signin;
