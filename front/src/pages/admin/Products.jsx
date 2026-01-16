import React from "react";
import { useGetProducts } from "../../api/products/useGetProducts";

export default function Products() {
  const { data } = useGetProducts();

  return (
    <div>
      <p>Admin Products</p>

      <table className="w-full border border-collapse">
        <thead className="bg-blue-400">
          <tr className="text-left">
            <th>ID</th>
            <th>name</th>
            <th>description</th>
            <th>price</th>
            <th>category</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {data?.map((product) => (
            <tr
              key={product.id}
              className="bg-blue-100 hover:bg-blue-300 cursor-pointer duration-200`"
            >
              <td className="w-[3%] text-center">{product.id}</td>
              <td className="w-[35%]">{product.name}</td>
              <td className="w-[36%]">{product.description}</td>
              <td className="w-[10%]">{product.price}</td>
              <td className="w-[10%]">{product.category_details.name}</td>
              <td  className="w-[10%] flex gap-6 items-center p-1">
                <button onClick={() => alert(`Updating ID: ${product.id}`)} className="cursor-pointer bg-green-300 hover:bg-green-200 p-1 rounded-[5px]">Update</button>
                <button onClick={() => alert(`Deleting ID: ${product.id}`)} className="cursor-pointer bg-red-300 hover:bg-red-200 p-1 rounded-[5px]">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
