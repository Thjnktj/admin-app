import React from "react";
import Modals from "../../components/Modals";

function Delete(props) {
  const { name, dispatch } = props;
  return (
    <>
      <Modals
        typeBtn="link"
        nameBtn="Xóa"
        titles="Xóa sản phẩm"
        styleBtn={{ color: "red" }}
        dispatch={name !== "" ? dispatch : () => {}}
      >
        <p>
          Bạn có chắc muốn xóa sản phẩm: <b>{name}</b>{" "}
        </p>
      </Modals>
    </>
  );
}

export default Delete;
