import { Col, Input, Row, Select } from "antd";
import React from "react";
import Modals from "../../components/Modals";

function Create(props) {
  const { dispatch, children, nameInput, onChangeInput, onChangeSelect } = props;
  return (
    <>
      <Modals
        nameBtn="Thêm danh mục"
        titles="Thêm danh mục"
        dispatch={dispatch}
      >
        <Row gutter={[16, 24]} style={{ marginBottom: "1rem" }}>
          <Col span={24}>
            <label htmlFor="#name">Nhập tên danh mục</label>
            <Input value={nameInput} onChange={onChangeInput} />
          </Col>
        </Row>

        <Select
          showSearch
          style={{ width: "100%" }}
          placeholder="Chọn danh mục cha"
          optionFilterProp="children"
          onChange={onChangeSelect}
          filterOption={(input, option) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {children}
        </Select>
      </Modals>
    </>
  );
}

export default Create;
