import React from "react";
import RolePermissionList from "../information/components/RolePermissionList";

const RolePermissionListContainer = () => {
  return (
    <div className="container">
      <div className="card card-custom gutter-b">
        <RolePermissionList />
      </div>
    </div>
  );
};

export default RolePermissionListContainer;
