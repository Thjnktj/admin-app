import React from "react";
import { Breadcrumb, Divider, message } from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Tables from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import Delete from "./Delete";
import { deleteUser, getUser, updateRole } from "../../redux/actions";

function User() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = (id, role) => {
    role = role === "admin" ? "user" : "admin";
    const user = { id, role };
    dispatch(updateRole(user)).then((result) => {
      if (result) {
        dispatch(getUser());
      }
    });
    setTimeout(() => {
      message.success("Đã cập nhật quyền");
    }, 1000);
  };

  const data =
    user.users.length > 0
      ? user.users.map((item, index) => {
          return {
            _id: item._id,
            key: index,
            fullName: item.fullName,
            role: (
              <>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleClick(item._id, item.role);
                  }}
                >
                  {item.role}
                </p>
              </>
            ),
            email: item.email,
            address: item.address,
            phone: item.phone,
            action: (
              <>
                <Delete
                  name={item.fullName}
                  dispatch={() => {
                    dispatch(deleteUser(item._id)).then((result) => {
                      if (result) {
                        dispatch(getUser());
                      }
                      setTimeout(() => {
                        message.error("Đã xóa người dùng");
                      }, 1000);
                    });
                  }}
                />
              </>
            ),
          };
        })
      : [];

  const titles = [
    {
      title: "Họ tên",
      dataIndex: "fullName",
      key: "fullName",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: "20%",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Tác vụ",
      dataIndex: "action",
      key: "action",
      width: "10%",
    },
  ];
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Khách hàng</Breadcrumb.Item>
      </Breadcrumb>
      <Divider orientation="left">Khách hàng</Divider>
      <div style={{ marginTop: "1rem" }}>
        <Tables data={data} titles={titles} />
      </div>
    </>
  );
}

export default User;
