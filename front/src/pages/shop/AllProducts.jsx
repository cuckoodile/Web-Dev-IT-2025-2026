import { useGetProducts } from "../../api/products/useGetProducts";
import Card from "../../components/Card";

export default function AllProducts() {
  const { data, isLoading, isError, error } = useGetProducts();
  // const {data}

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError || data == undefined) {
    console.log(error)

    return <p>Error...</p>;
  }

  const products = data?.results || [];

  if (!products || products.length === 0) {
    return <p>No products available</p>;
  }

  console.log("Products: ", products);

  return (
    <div>
      <p>AllProducts</p>

      {/* Product Cards */}
      <div className="flex gap-2">
        {products.map((item) => (
          <Card key={item.id} data={item} />
        ))
      }
      </div>
    </div>
  )
}
