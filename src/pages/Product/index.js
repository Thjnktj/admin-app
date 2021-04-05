import { Breadcrumb, Divider, message, Select } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HomeOutlined } from "@ant-design/icons";
import Tables from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import Create from "./Create";
import {
  addProduct,
  deleteProduct,
  getAllData,
} from "../../redux/actions/product.action";
import Detail from "./Detail";
import Delete from "./Delete";
import Update from "./Update";

const { Option } = Select;

function Product() {
  const [name, setName] = useState("");
  const [parentId, setParentId] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState([]);

  const [show, setShow] = useState(false);
  const [detail, setDetail] = useState();

  const product = useSelector((state) => state.product);
  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const data =
    product.products.length > 0
      ? product.products.map((prod, index) => {
          return {
            _id: prod._id,
            key: index,
            image: (
              <img
                src={prod.images[0].url}
                alt=""
                style={{
                  width: "150px",
                  height: "100px",
                  overflow: "hidden",
                  marginRight: "3px",
                  textAlign: "center",
                }}
              />
            ),
            name: prod.name,
            price: `${String(prod.price).replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            )}đ`,
            quantity: prod.quantity,
            action: (
              <>
                <Detail data={prod} />
                <span
                  onClick={() => {
                    setShow(!show);
                    setDetail(prod);
                  }}
                  style={{ cursor: "pointer", color: "green" }}
                >
                  Sửa
                </span>
                <Delete
                  name={prod.name}
                  dispatch={() => {
                    dispatch(deleteProduct(prod._id)).then((result) => {
                      if (result) {
                        dispatch(getAllData());
                      }
                    });
                    setTimeout(() => {
                      message.error("Đã xóa sản phẩm");
                    }, 1000);
                  }}
                />
              </>
            ),
          };
        })
      : [];

  const titles = [
    {
      title: "Ảnh",
      dataIndex: "image",
      key: "images",
      width: "20%",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
      width: "40%",
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      width: "10%",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Tác vụ",
      dataIndex: "action",
      key: "action",
      width: "20%",
    },
  ];

  const createCategory = (categories, options = []) => {
    for (let category of categories) {
      options.push({
        value: category._id,
        name: category.name,
      });
      if (category.children.length > 0) {
        createCategory(category.children, options);
      }
    }
    return options;
  };

  const products = () => {
    const form = new FormData();
    form.append("name", name);
    form.append("price", price);
    form.append("quantity", quantity);
    form.append("description", description);
    form.append("category", parentId);

    for (let pic of picture) {
      form.append("images", pic);
    }

    return form;
  };

  const renderCreateProduct = () => {
    return (
      <Create
        nameInput={name}
        onChangeInput={(e) => setName(e.target.value)}
        price={price}
        changePrice={(e) => setPrice(e.target.value)}
        quantity={quantity}
        changeQuantity={(e) => setQuantity(e.target.value)}
        description={description}
        changeDescription={(event, editor) => {
          const data = editor.getData();
          setDescription(data);
        }}
        picture={picture}
        changePicture={(e) => setPicture([...picture, e.target.files[0]])}
        onChangeSelect={(value) => setParentId(value)}
        dispatch={() => {
          dispatch(addProduct(products())).then((result) => {
            if (result) {
              dispatch(getAllData());
            }
          });
        }}
      >
        {createCategory(category.categories).map((option) => {
          return (
            <Option key={option.value} value={option.value}>
              {option.name}
            </Option>
          );
        })}
      </Create>
    );
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item>
          <Link to="/admin">
            <HomeOutlined />
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
      <Divider orientation="left">Quản lý sản phẩm</Divider>
      <div style={{ marginTop: "1rem" }}>
        {renderCreateProduct()}
        <p style={{ marginBottom: "1rem" }}></p>
        <Tables data={data} titles={titles} />
      </div>
      {show ? (
        <Update show={show} data={detail} categories={category.categories} />
      ) : null}
    </>
  );
}

export default Product;
