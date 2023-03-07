import { createContext, useContext, useReducer, useState } from "react";
import ICart from "../model/Cart";
import Product from "../model/Product";
import CartReducer from "./CartReducer";
import { ProductContext } from "./ProductContext";

type ContextType = {
    cart:ICart[],
    addToCart:(id:number) => void,
    increment:(id:number) => void
    checkout: () => void
}
export const CartContext = createContext<ContextType>({
    cart: [],
    addToCart: (id:number) => {},
    increment: (id:number) => {},
    checkout: () => {}
});

const initalState = {
    products:[],
    total:0.0
}
type Props = {
    children:React.ReactNode
}

export default function CartProvider(props:Props) {
    let [state, dispatch] = useReducer(CartReducer, initalState);
    let {products} = useContext(ProductContext);

    function addToCart(id:number) {
        let prd = products.find(p => p.id === id);
        dispatch({type:"ADD_TO_CART", "payload":prd!});
    }

    function increment(id:number) {
        dispatch({type:"INCREMENT", payload: id})
    }

    function checkout() {
        // TODO
    }
    return <CartContext.Provider value={
        {
        cart: state.products,
        addToCart, 
        increment, 
        checkout
      }
    }>
        {props.children}
    </CartContext.Provider>
}