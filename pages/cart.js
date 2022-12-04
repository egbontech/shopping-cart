import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "./components/Navbar";
import Link from "next/link";
import {
  clearCart,
  decreaseCart,
  getTotal,
  increaseCart,
  removeFromCart,
} from "../features/cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  const cartstyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleRemoveFromCart = (cartitem) => {
    dispatch(removeFromCart(cartitem));
  };
  const handleDecreaseCart = (cartitem) => {
    dispatch(decreaseCart(cartitem));
  };
  const handleIncreaseCart = (cartitem) => {
    dispatch(increaseCart(cartitem));
  };
  const handleClearCart = (cartitem) => {
    dispatch(clearCart(cartitem));
  };

  return (
    <div>
      <Navbar />
      <h1 style={cartstyle}>cart page</h1>
      <div>
        {cart.cart.cartItems.length === 0 ? (
          <div>
            <h3 style={cartstyle}>cart is empty</h3>
            <Link href="/">
              <a style={cartstyle}>start shopping</a>
            </Link>
          </div>
        ) : (
          <div>
            {cart.cart.cartItems?.map((cartitem) => (
              <div className="cart" key={cartitem.id}>
                <div className="product">
                  <h2>{cartitem.name}</h2>
                  <button onClick={() => handleRemoveFromCart(cartitem)}>
                    remove
                  </button>
                </div>
                <div className="price">${cartitem.price}</div>
                <div className="quantity">
                  <button onClick={() => handleDecreaseCart(cartitem)}>
                    -
                  </button>
                  <h2>1</h2>
                  <button onClick={() => handleIncreaseCart(cartitem)}>
                    +
                  </button>
                </div>
                <div className="total">{cartitem.cartQuantity}</div>
                <div className="total">
                  total price:$
                  {Math.ceil(cartitem.price * cartitem.cartQuantity)}
                </div>
              </div>
            ))}

            <div>
              Total Amount:${Math.ceil(cart.cart.cartTotalAmount)}
              <Link href="/">
                <a href="">
                  <h1>continue shopping</h1>
                </a>
              </Link>
              <h1>checkout</h1>
              <button onClick={handleClearCart}>clear cart</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
