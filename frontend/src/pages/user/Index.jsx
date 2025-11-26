import React from "react";
import { Outlet, useParams } from "react-router-dom";
import { withAuth } from "../../functions/hoc/WithAuth";
import useGetUser from "../../functions/api/user/useGetUser";

function UserIndex() {
  const id = useParams().id;

  const {
    data: userData,
    isError,
    isLoading,
  } = useGetUser(localStorage.getItem("token"), id);

  const data = { userData: userData };

  return (
    <div>
      <div>User Index</div>

      <div>
        <Outlet context={data} />
      </div>
    </div>
  );
}

export default withAuth(UserIndex);
