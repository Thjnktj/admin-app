import React from "react";
import Modals from "../../components/Modals";

function Delete(props) {
  const { name, dispatch } = props;
  return (
    <>
      <Modals
        typeBtn="link"
        nameBtn="Xóa"
        titles="Xóa người dùng"
        styleBtn={{ color: "red" }}
        dispatch={name !== "" ? dispatch : () => {}}
      >
        <p>Bạn có chắc muốn xóa người dùng này:</p>
        <p>
          <b>{name}</b>{" "}
        </p>
      </Modals>
    </>
  );
}

export default Delete;
