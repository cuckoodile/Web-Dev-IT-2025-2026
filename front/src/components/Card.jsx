import React from "react";
import { replace, useNavigate } from "react-router";

export default function Card({ data }) {
  const nav = useNavigate();

  console.log("Card: ", data);
  return (
    <div
      // Dynamic Routing
      onClick={() => nav(`/products/${data?.id}`)}
      className="bg-white border max-w-56 min-w-50 rounded-2xl flex flex-col justify-center overflow-hidden gap-1 cursor-pointer duration-150 hover:scale-105 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative bg-red-400 h-40">
        <img
          // onClick={() => console.log(data?.name)}
          src={data?.thumbnail}
          alt={data?.name}
          className="absolute size-full"
        />
      </div>

      {/* Text Content */}
      <div className="p-2 flex flex-col gap-2">
        <p>{data?.name}</p>
        <div className="flex justify-between">
          <p>{data?.price}</p>
          <p>{data?.category_details?.name}</p>
        </div>
        <p>{data?.description}</p>
      </div>
    </div>
  );
}
