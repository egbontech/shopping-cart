import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const initialState = {
    cartItems: [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemindex = state.cartItems.findIndex((item) => item.id === action.payload.id)
            if (itemindex >= 0) {

                if (state.cartItems[itemindex].cartQuantity < 5) {
                    state.cartItems[itemindex].cartQuantity += 1
                    toast.success(`${state.cartItems[itemindex].name} quantity updated in cart`, {
                        position: "top-center"
                    })
                }
                else {
                    toast.error(`${action.payload.name} cart quantity cannot exceed 5`, {
                        position: "top-center"
                    })
                }

            }
            else {
                const tempProduct = { ...action.payload, cartQuantity: 1 }
                state.cartItems.push(tempProduct);
                toast.success(`${action.payload.name} added to cart`, {
                    position: "top-center"
                })
            }

        },
        removeFromCart(state, action) {
            const nextcartitems = state.cartItems.filter(
                cartItem => cartItem.id !== action.payload.id
            )

            state.cartItems = nextcartitems;
            toast.success(`${action.payload.name} removed from cart`, {
                position: "top-center"
            })
        },
        decreaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            )
            if (state.cartItems[itemIndex].cartQuantity > 1) {
                state.cartItems[itemIndex].cartQuantity -= 1.
                toast.success(`Decreased ${action.payload.name} cart quantity`, {
                    position: "top-center"
                })
            }
            else if (state.cartItems[itemIndex].cartQuantity == 1) {
                const nextcartitems = state.cartItems.filter(
                    cartItem => cartItem.id !== action.payload.id
                )

                state.cartItems = nextcartitems;
                toast.success(`${action.payload.name} removed from cart`, {
                    position: "top-center"
                })
            }
        },
        increaseCart(state, action) {
            const itemIndex = state.cartItems.findIndex(
                (cartItem) => cartItem.id === action.payload.id
            )
            if (state.cartItems[itemIndex].cartQuantity < 5) {
                state.cartItems[itemIndex].cartQuantity += 1.
                toast.success(`Increased ${action.payload.name} cart quantity`, {
                    position: "top-center"
                })
            }
            else {
                toast.error(`${action.payload.name} cart quantity cannot exceed 5`, {
                    position: "top-center"
                })
            }
        },
        clearCart(state, action) {
            state.cartItems = [];
            toast.success(`Cart cleared`, {
                position: "top-center"
            })
        },
        getTotal(state, action) {
            let { total, quantity } = state.cartItems.reduce((cartTotal, cartItem) => {
                const { price, cartQuantity } = cartItem;
                const itemTotal = price * cartQuantity;

                cartTotal.total += itemTotal
                cartTotal.quantity += cartQuantity

                return cartTotal;
            }, {
                total: 0,
                quantity: 0,
            });
            state.cartTotalQuantity = quantity;
            state.cartTotalAmount = total;
        }
    }
})

export const { addToCart, removeFromCart, decreaseCart, increaseCart, clearCart ,getTotal} = cartSlice.actions;

export default cartSlice.reducer;