import React from "react";
import { Table } from "antd";
import Models from "../../components/Modals";

function Detail(props) {
  const { prod, user } = props.data;
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tổng giá",
      dataIndex: "price",
      key: "price",
    },
  ];

  let data = prod.product.map((item, index) => {
    return {
      key: index,
      name: item.name,
      quantity: item.quantity,
      price: `${String(item.quantity * item.price).replace(
        /\B(?=(\d{3})+(?!\d))/g,
        "."
      )}đ`,
    };
  });

  data.push({
    key: `check-order`,
    name: ``,
    quantity: `Tổng đơn`,
    price: prod.money,
  });
  return (
    <>
      <Models
        typeBtn="link"
        nameBtn="Xem"
        titles="Chi tiết đơn hàng"
        width={900}
        dispatch={() => {}}
      >
        <p>
          <b>Người nhận: </b>
          <i>{`${user.firstName} ${user.lastName}`}</i>
        </p>
        <p>
          <b>Số điện thoại: </b>
          <i>{user.phone}</i>
        </p>
        <p>
          <b>Địa chỉ: </b>
          <i>{user.address}</i>
        </p>
        <p>
          <b>Ngày đặt: </b>
          <i>{prod.dateBuy}</i>
        </p>
        <p>
          <b>Phương thức thanh toán: </b>
          <i>Thanh toán khi nhận hàng</i>
        </p>
        <h3 style={{ textTransform: "uppercase" }}>
          <b>Danh sách sản phẩm</b>
        </h3>
        <Table columns={columns} dataSource={data} />
      </Models>
    </>
  );
}

export default Detail;
