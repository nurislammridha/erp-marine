import React from "react";
import ItemList from "../information/components/ItemList";

const ItemListContainer = () => {
  return (
    <div className="container">
      <div className="card card-custom gutter-b">
        <ItemList />
      </div>
    </div>
  );
};

export default ItemListContainer;
