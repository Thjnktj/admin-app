import React from "react";
import Modals from "../../components/Modals";

function Delete(props) {
  const { name, list, dispatch } = props;
  return (
    <>
      <Modals
        nameBtn="Xóa"
        type="default"
        styleBtn={{ marginLeft: "1rem", background: "red" }}
        titles="Xóa danh mục"
        dispatch={name !== "" ? dispatch : () => {}}
      >
        {name !== "" ? (
          <>
            <p>
              Bạn có chắc muốn xóa danh mục: <b>{name}</b>{" "}
            </p>
            <p>
              <span>
                Danh sách danh mục sẽ bị xóa theo:{" "}
                {list !== null ? (
                  list.map((item, index) => {
                    return (
                      <span key={index} style={{ marginLeft: "0.4rem" }}>
                        <b>{item.title}</b>
                      </span>
                    );
                  })
                ) : (
                  <b>Không có</b>
                )}
              </span>
            </p>
          </>
        ) : (
          <p>Mời chọn danh mục cần xóa!</p>
        )}
      </Modals>
    </>
  );
}

export default Delete;
