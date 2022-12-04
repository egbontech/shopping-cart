import { useGetAllProductsQuery } from "../features/productApi";
import Navbar from "./components/Navbar";
import { useDispatch } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { useRouter } from "next/router";

export default function Home() {
  const { data, error, isLoading, isSuccess } = useGetAllProductsQuery();
  const dispatch = useDispatch();
  const router = useRouter();

  const cartstyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20px",
  };
  const buttonstyle = {
    cursor: "pointer",
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    router.push("/cart");
  };
  return (
    <div>
      <Navbar />
      <h1 style={cartstyle}>Home Page</h1>
      {isLoading && <h2 style={cartstyle}>Loading...</h2>}
      {error && <h2 style={cartstyle}>something went wrong</h2>}
      {isSuccess && (
        <div>
          {data?.map((product) => {
            return (
              <div key={product.id}>
                <h1 style={cartstyle}>{product.name}</h1>
                <div style={cartstyle}>
                  <button
                    style={buttonstyle}
                    onClick={() => handleAddToCart(product)}
                  >
                    add to cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
