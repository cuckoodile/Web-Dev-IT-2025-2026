import React from "react";
import useGetProducts from "../functions/api/products/useGetProducts";

export default function Index() {
  const { data, isError, isLoading } = useGetProducts();

  if (isLoading) {
    return <p>Loading....</p>;
  }

  if (isError) {
    return <p>Error fetching products {isError}</p>;
  } else {
    console.log("Fetched products: ", data);
    return (
      <div>
        <p>Index</p>

        <div className="flex flex-col gap-6">
          {/* Products Card */}
          {data?.map((item) => (
            <div key={item?.id} className="border bg-white">
              {/* Texts */}
              <div className="px-2">
                <span>{item?.name || "No name"}</span>
                <p>
                  {item?.description.length > 150
                    ? item?.description.slice(0, 150) + "..."
                    : item?.description || "No description"}
                </p>
              </div>

              <div className="flex justify-center items-center gap-3">
                {/* Thumbnail */}
                <div className="size-[40vh] relative">
                  <img
                    src={item?.thumbnail || item?.product_images[0].image}
                    alt={item?.name}
                    className="absolute size-full object-cover hover:scale-95 duration-200"
                  />
                </div>

                {/* Product Images */}
                <div className="h-[39vh] overflow-y-auto overflow-x-hidden flex flex-col">
                  {item?.product_images.map((itemImage, index) => (
                    <div key={itemImage?.id} className="size-64">
                      <img
                        src={itemImage?.image}
                        alt={item?.name + " image " + index}
                        className="size-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
