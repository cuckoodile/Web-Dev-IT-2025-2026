import React from "react";
import { useNavigate, useParams } from "react-router";
import { useRetrieveProduct } from "../../api/products/useRetrieveProduct";

export default function ProductDetail() {
  // Params means Parameter = Arguement
  const productId = useParams().id;
  const nav = useNavigate();

  const { data, isLoading, isError } = useRetrieveProduct(productId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error on fetch...</p>;
  }

  console.log(data);

  return (
    <div className="min-h-full flex flex-col">
      <header>
        <button onClick={() => nav(-1)} className="cursor-pointer">
          <span>{"<"}</span> Back
        </button>
      </header>

      <section className="flex-1">
        <img src={data?.thumbnail} alt={data?.name} className="size-60" />
        <p>{data?.name}</p>
        <p>{data?.price}</p>
        <p>{data?.category_details.name}</p>
        <p>{data?.description}</p>
      </section>
    </div>
  );
}
