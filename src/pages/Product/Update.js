import React, { useState } from "react";
import { Col, Input, message, Modal, Row, Select } from "antd";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useDispatch } from "react-redux";
import { getAllData, updateProduct } from "../../redux/actions/product.action";
const { Option } = Select;

function Update(props) {
  const { categories, data, show } = props;

  const [visible, setVisible] = useState(show);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [name, setName] = useState(data.name);
  const [parentId, setParentId] = useState(data.category._id);
  const [price, setPrice] = useState(data.price);
  const [quantity, setQuantity] = useState(data.quantity);
  const [description, setDescription] = useState(data.description);
  const [picture, setPicture] = useState([]);
  const dispatch = useDispatch();

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
    dispatch(updateProduct(products())).then((result) => {
      if (result) {
        dispatch(getAllData());
      }
    });
    setTimeout(() => {
      message.success("Đã cập nhật sản phẩm");
    }, 1000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const products = () => {
    const form = new FormData();
    form.append("_id", data._id);
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

  return (
    <>
      <Modal
        title="Sửa sản phẩm"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Row gutter={[16, 24]} style={{ marginBottom: "1rem" }}>
          <Col span={24}>
            <label htmlFor="#name">Tên sản phẩm</label>
            <Input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Col>
        </Row>
        <Row gutter={[16, 24]} style={{ marginBottom: "1rem" }}>
          <Col span={12}>
            <label htmlFor="#price">Giá</label>
            <Input value={price} onChange={(e) => setPrice(e.target.value)} />
          </Col>
          <Col span={12}>
            <label htmlFor="#quantity">Số lượng</label>
            <Input
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </Col>
        </Row>
        <Row gutter={[16, 24]} style={{ marginBottom: "1rem" }}>
          <Col span={24}>
            <label htmlFor="#description">Mô tả</label>
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={(event, editor) => {
                const data1 = editor.getData();
                setDescription(data1);
              }}
            />
          </Col>
        </Row>

        <Row gutter={[16, 24]} style={{ marginBottom: "1rem" }}>
          <Col span={24}>
            <label htmlFor="#category">Danh mục</label>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Chọn danh mục"
              optionFilterProp="children"
              value={parentId}
              onChange={(value) => setParentId(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {createCategory(categories).map((option) => {
                return (
                  <Option key={option.value} value={option.value}>
                    {option.name}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
        <Row gutter={[16, 24]} style={{ marginBottom: "1rem" }}>
          <Col span={24}>
            <label htmlFor="#picture">
              Chọn {picture.length > 0 ? picture.length : 0} ảnh
            </label>
            <br />
            <Input
              type="file"
              name={picture}
              onChange={(e) => setPicture([...picture, e.target.files[0]])}
            />
          </Col>
        </Row>
      </Modal>
    </>
  );
}

export default Update;
