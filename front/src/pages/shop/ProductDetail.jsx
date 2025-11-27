import React from "react";
import { useParams } from "react-router";
import { useRetrieveProduct } from "../../api/products/useRetrieveProduct";

export default function ProductDetail() {
  // Params means Parameter = Arguement
  const productId = useParams().id;

  const { data, isLoading, isError } = useRetrieveProduct(productId);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error on fetch...</p>;
  }

  console.log(data);

  return (
    <div>
      <img src={data?.thumbnail} alt={data?.name} className="size-60" />

      <p>{data?.name}</p>
      <p>{data?.price}</p>
      <p>{data?.category_details.name}</p>
      <p>{data?.description}</p>
    </div>
  );
}
