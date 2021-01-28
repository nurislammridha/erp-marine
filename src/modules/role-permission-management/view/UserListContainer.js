import React from "react";

import UserList from "../information/components/UserList";

const UserListContainer = () => {
  return (
    <div className="container">
      <div className="card card-custom gutter-b">
        <UserList />
      </div>
    </div>
  );
};

export default UserListContainer;
