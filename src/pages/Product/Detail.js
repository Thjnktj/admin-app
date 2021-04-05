import { Col, Row } from "antd";
import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Models from "../../components/Modals";

function Detail(props) {
  const { data } = props;
  return (
    <>
      <Models
        typeBtn="link"
        nameBtn="Xem"
        titles="Chi tiết sản phẩm"
        dispatch={() => {}}
      >
        <Row gutter={[16, 24]}>
          <Col span={16}>
            <label>Tên sản phẩm</label>
            <p>
              <b>{data.name}</b>
            </p>
          </Col>
          <Col span={8}>
            <label>Danh mục</label>
            <p>
              <b>{data.category.name}</b>
            </p>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={16}>
            <label>Giá</label>
            <p>
              <b>{data.price}</b>
            </p>
          </Col>
          <Col span={8}>
            <label>Số lượng</label>
            <p>
              <b>{data.quantity}</b>
            </p>
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={24} disable>
            <label>Mô tả sản phẩm</label>
            <CKEditor editor={ClassicEditor} data={data.description} />
          </Col>
        </Row>
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <label>Ảnh sản phẩm</label>
            <div style={{ display: "flex" }}>
              {data.images.map((pic, index) => (
                <div
                  key={index}
                  style={{
                    width: "100px",
                    height: "100px",
                    overflow: "hidden",
                    marginRight: "3px",
                    textAlign: "center",
                  }}
                >
                  <img
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                    src={pic.url}
                    alt=""
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Models>
    </>
  );
}

export default Detail;
