import { Breadcrumb, Divider, message } from "antd";
import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import Tables from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import Detail from "./Detail";
import { checkOut, getAllData, getAllOrder } from "../../redux/actions";

function Cart() {
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();

  const renderOrders = (data) => {
    let money = 0;
    let quantity = 0;
    let prod = [];
    let dateBuy;

    //Tính số lượng sản phẩm
    for (let item of data) {
      if (!item.ordered) {
        quantity += item.quantity;
        let product = item.product;
        product.quantity = item.quantity;
        prod.push(product);
        dateBuy = item.dateBuy;
      }
    }

    //Trả về kết quả
    let result;
    if (prod.length > 0) {
      for (let item of prod) {
        money += item.price;
      }

      result = {
        product: prod,
        quantity: quantity,
        dateBuy: formatDate(dateBuy),
        money: `${String(money).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}đ`,
        status: false,
      };
    } else {
      result = {
        status: true,
      };
    }

    return result;
  };

  const formatDate = (times) => {
    const date = new Date(times);
    const hh = date.getHours();
    const m = date.getMinutes();
    const dd = date.getDate();
    const mm = date.getMonth();
    const yyyy = date.getFullYear();

    return `${hh > 10 ? hh : `0${hh}`}:${m > 10 ? m : `0${m}`}, ${
      dd > 10 ? dd : `0${dd}`
    }-${mm > 10 ? mm : `0${mm}`}-${yyyy}`;
  };

  let i = 0;
  let data = [];

  if (order.orders.length > 0) {
    for (let ord of order.orders) {
      let prod = renderOrders(ord.orders);
      if (!prod.status) {
        let result = {
          _id: ord._id,
          key: ord._id,
          stt: i + 1,
          user: `${ord.user.firstName} ${ord.user.lastName}`,
          money: prod.money,
          times: prod.dateBuy,
          status: (
            <p
              style={{ cursor: "pointer", color: "green" }}
              onClick={() => {
                if (!prod.status) {
                  dispatch(checkOut(ord._id)).then((result) => {
                    if (result) {
                      setTimeout(() => {
                        message.success("Chốt đơn thành công");
                      }, 1000);
                      dispatch(getAllOrder());
                      dispatch(getAllData());
                    }
                  });
                }
              }}
            >
              {prod.status ? "Đã chốt" : "Đặt hàng"}
            </p>
          ),
          action: <Detail data={{ prod, user: ord.user }} />,
        };
        data.push(result);
      }
    }
  }

  const titles = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "15%",
    },
    {
      title: "Người đặt",
      dataIndex: "user",
      key: "user",
      width: "15%",
    },
    {
      title: "Tổng tiền",
      dataIndex: "money",
      key: "money",
      width: "15%",
    },
    {
      title: "Thời gian đặt",
      dataIndex: "times",
      key: "times",
      width: "15%",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: "10%",
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
        <Breadcrumb.Item>Giỏ hàng</Breadcrumb.Item>
      </Breadcrumb>
      <Divider orientation="left">Quản lý đơn hàng</Divider>
      <div style={{ marginTop: "1rem" }}>
        <Tables data={data} titles={titles} />
      </div>
    </>
  );
}

export default Cart;
