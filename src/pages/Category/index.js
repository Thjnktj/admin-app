import React, { useState } from "react";
import {
  Breadcrumb,
  Tree,
  Switch,
  Divider,
  Select,
  Col,
  Row,
  Input,
  message,
} from "antd";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modals from "../../components/Modals";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  updateCategory,
} from "../../redux/actions/category.action";
import Delete from "./Delete";
import Create from "./Create";

const { Option } = Select;

function Category() {
  const [showLine, setShowLine] = useState(true);
  const [showLeafIcon, setShowLeafIcon] = useState(true);
  const [name, setName] = useState("");
  const [_id, setId] = useState("");
  const [parentId, setParentId] = useState("");
  const [list, setList] = useState([]);

  const category = useSelector((state) => state.category);
  const dispatch = useDispatch();

  const renderCategories = (categories) => {
    let cat = [];
    for (let category of categories) {
      cat.push({
        title: category.name,
        key: category._id,
        parentId: category.parentId,
        children:
          category.children.length > 0
            ? renderCategories(category.children)
            : null,
      });
    }
    return cat;
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

  const cat = { name, parentId };
  const update = { _id, name, parentId };
  const remove = { _id, parentId };

  const onSelect = (selectedKeys, info) => {
    const { title, parentId, children, key } = info.node;
    setId(key);
    setName(title);
    setParentId(parentId);
    setList(children);
  };

  const onSetLeafIcon = (checked) => {
    setShowLeafIcon(checked);
    setShowLine({
      showLeafIcon: checked,
    });
  };

  const onSetShowLine = (checked) => {
    setShowLine(
      checked
        ? {
            showLeafIcon,
          }
        : false
    );
  };

  const renderCreateCategory = () => {
    return (
      <Create
        nameInput={name}
        onChangeInput={(e) => setName(e.target.value)}
        onChangeSelect={(value) => setParentId(value)}
        dispatch={() =>
          dispatch(addCategory(cat)).then((result) => {
            if (result) {
              dispatch(getAllCategory());
              setTimeout(() => {
                message.success("Th??m danh m???c th??nh c??ng");
              }, 1000);
            }
          })
        }
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

  const renderUpdateCategory = () => {
    return (
      <Modals
        nameBtn="S???a"
        titles="S???a danh m???c"
        dispatch={
          name !== ""
            ? () => {
                dispatch(updateCategory(update)).then((result) => {
                  if (result) {
                    dispatch(getAllCategory());
                    setTimeout(() => {
                      message.success("C???p nh???t m???c th??nh c??ng");
                    }, 1000);
                  }
                });
              }
            : () => {}
        }
      >
        {name === "" && parentId === "" ? (
          <p>M???i ch???n danh m???c c???n s???a l???i!</p>
        ) : (
          <>
            <Row gutter={[16, 24]} style={{ marginBottom: "1rem" }}>
              <Col span={24}>
                <label htmlFor="#name">Nh???p t??n danh m???c</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </Col>
            </Row>

            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Ch???n danh m???c cha"
              optionFilterProp="children"
              value={parentId}
              onChange={(value) => setParentId(value)}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {createCategory(category.categories).map((option) => {
                return (
                  <Option key={option.value} value={option.value}>
                    {option.name}
                  </Option>
                );
              })}
            </Select>
          </>
        )}
      </Modals>
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
        <Breadcrumb.Item>Danh m???c</Breadcrumb.Item>
      </Breadcrumb>
      <Divider orientation="left">Danh m???c</Divider>
      <div style={{ marginTop: "1rem" }}>
        <div
          style={{
            marginBottom: 16,
          }}
        >
          {/*Create new category */ renderCreateCategory()}
          <p style={{ marginBottom: "1rem" }}></p>
          Hi???n th??? ???????ng k???:{" "}
          <Switch checked={!!showLine} onChange={onSetShowLine} />
          <br />
          <br />
          Hi???n th??? icon:{" "}
          <Switch checked={showLeafIcon} onChange={onSetLeafIcon} />
        </div>
        <Tree
          showLine={showLine}
          defaultExpandedKeys={["Laptop"]}
          onSelect={onSelect}
          treeData={renderCategories(category.categories)}
        />
        {/*Update category */ renderUpdateCategory()}
        <Delete
          name={name}
          list={list}
          dispatch={() => {
            dispatch(deleteCategory(remove)).then((result) => {
              if (result) {
                dispatch(getAllCategory());
                setTimeout(() => {
                  message.error("???? x??a danh m???c");
                }, 1000);
              }
            });
          }}
        />
      </div>
    </>
  );
}

export default Category;
