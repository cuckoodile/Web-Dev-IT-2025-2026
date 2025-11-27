import React from "react";
import { useGetProducts } from "../../api/products/useGetProducts";
import Card from "../../components/Card";

export default function AllProducts() {
  const { data, isLoading } = useGetProducts();
  // const {data}

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log("Products: ", data);

  return (
    <div>
      <p>AllProducts</p>

      {/* Product Cards */}
      <div className="flex gap-2">
        {data.map((item) => (
          <Card key={item.id} data={item} />
        ))}
      </div>
    </div>
  )
}
