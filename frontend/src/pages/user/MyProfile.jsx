import React, { use } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import useGetUser from "../../functions/api/user/useGetUser";

export default function MyProfile() {

  const {userData} = useOutletContext();
  return (
    <div>
      <div>
        <img
          src={userData?.profile_image}
          className="rounded-full size-[10vw] border"
        />
      </div>

      <p>{userData?.first_name + " " + userData?.last_name}</p>
    </div>
  );
}
