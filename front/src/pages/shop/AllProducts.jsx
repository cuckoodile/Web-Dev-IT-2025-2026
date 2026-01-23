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

  console.log("Products: ", data);

  return (
    <div>
      <p>AllProducts</p>

      {/* Product Cards */}
      <div className="flex gap-2">
        {data.length != 0 ? data?.map((item) => (
          <Card key={item.id} data={item} />
        ))
        :
        <p>No data</p>
      }
      </div>
    </div>
  )
}
