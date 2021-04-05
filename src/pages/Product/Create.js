import { Col, Input, Row, Select } from "antd";
import React from "react";
import Modals from "../../components/Modals";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

function Create(props) {
  const {
    dispatch,
    children,
    nameInput,
    price,
    quantity,
    picture,
    changePicture,
    description,
    changePrice,
    changeQuantity,
    changeDescription,
    onChangeInput,
    onChangeSelect,
  } = props;
  return (
    <>
      <Modals
        nameBtn="Thêm sản phẩm"
        titles="Thêm sản phẩm"
        dispatch={dispatch}
      >
        <Row gutter={[16, 24]} style={{ marginBottom: "1rem" }}>
          <Col span={24}>
            <label htmlFor="#name">Tên sản phẩm</label>
            <Input value={nameInput} onChange={onChangeInput} />
          </Col>
        </Row>
        <Row gutter={[16, 24]} style={{ marginBottom: "1rem" }}>
          <Col span={12}>
            <label htmlFor="#price">Giá</label>
            <Input value={price} onChange={changePrice} />
          </Col>
          <Col span={12}>
            <label htmlFor="#quantity">Số lượng</label>
            <Input value={quantity} onChange={changeQuantity} />
          </Col>
        </Row>
        <Row gutter={[16, 24]} style={{ marginBottom: "1rem" }}>
          <Col span={24}>
            <label htmlFor="#description">Mô tả</label>
            <CKEditor
              editor={ClassicEditor}
              data={description}
              onChange={changeDescription}
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
              onChange={onChangeSelect}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {children}
            </Select>
          </Col>
        </Row>
        <Row gutter={[16, 24]} style={{ marginBottom: "1rem" }}>
          <Col span={24}>
            <label htmlFor="#picture">
              Chọn {picture.length > 0 ? picture.length : 0} ảnh
            </label>
            <br />
            <Input type="file" name={picture} onChange={changePicture} />
          </Col>
        </Row>
      </Modals>
    </>
  );
}

export default Create;
