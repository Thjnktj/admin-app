import React, { useState } from "react";
import { Modal, Button } from "antd";

function Models(props) {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const { nameBtn, titles, dispatch, typeBtn, styleBtn, width } = props;

  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
    dispatch();
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <>
      <Button
        type={typeBtn ? typeBtn : "primary"}
        style={styleBtn ? styleBtn : {}}
        onClick={showModal}
      >
        {nameBtn}
      </Button>

      <Modal
        title={titles}
        visible={visible}
        onOk={handleOk}
        width={width ? width : 550}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        {props.children}
      </Modal>
    </>
  );
}

export default Models;
