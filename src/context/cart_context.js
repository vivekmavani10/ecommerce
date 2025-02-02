import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from "../reducer/cartReducer";

const CartContext = createContext();

const getLocalCartData = () => {
  let localCartData = localStorage.getItem("myCart");

  // Check if localCartData is null or not an array
  if (!localCartData) {
    return [];
  } else {
    return JSON.parse(localCartData);
  }
};


const initialState = {
  // cart: [],
  cart: getLocalCartData(),
  total_item: 0,
  total_price: 0,
  shipping_fee: 50000,
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (id, color, amount, product) => {
    dispatch({ type: "ADD_TO_CART", payload: { id, color, amount, product } });
  };

  // increment and decrement function
  const setDecrease = (id) => {
    dispatch({ type: "DECREASE", payload: id });
  }

  const setIncrease = (id) => {
    dispatch({ type: "INCREASE", payload: id })
  }


  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };


  // to clear the cart
  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  }


  // to add data into localStorage
  useEffect(() => {
    dispatch({type: 'CART_TOTAL_ITEM'})
    dispatch({type: 'CART_TOTAL_PRICE'})
    localStorage.setItem("myCart", JSON.stringify(state.cart))
  }, [state.cart])
  

  return (
    <CartContext.Provider value={{ ...state, addToCart, removeItem, clearCart, setDecrease, setIncrease }}>
      {children}
    </CartContext.Provider>
  );
};

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartProvider, useCartContext };