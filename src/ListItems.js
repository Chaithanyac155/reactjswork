import React from "react";

export default function ListItems(props) {
  const items = props.items;

  return items.map((item, index) => (
    <div>
      <hr style={{ margin: 0 }} />
      <div className="row">
        <div className="col-sm h-25 mt-1 ml-2">
          <b>{item.text}</b>

          <pre>is your friend</pre>
        </div>

        <div className="col-sm icon-style  mt-3">
          {item.flag ? (
            <span
              className="material-icons"
              onClick={() => {
                props.favouriteItem(index, false);
              }}
            >
              star
            </span>
          ) : (
            <span
              className="material-icons"
              onClick={() => {
                props.favouriteItem(index, true);
              }}
            >
              star_outline
            </span>
          )}
          <span
            className="material-icons"
            onClick={() => {
              props.deleteItem(index);
            }}
          >
            delete_outline
          </span>
        </div>
      </div>
    </div>
  ));
}
