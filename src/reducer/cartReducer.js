const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, amount, product } = action.payload;
    // console.log(
    //   "🚀 ~ file: cartReducer.js ~ line 4 ~ cartReducer ~ product",
    //   product
    // );


    // tackle the existing product
    let existingProduct = state.cart.find(
      (curItem) => curItem.id === id + color
    );
    // console.log(existingProduct);
    if (existingProduct) {
      let updatedProduct = state.cart.map((curElem) => {
        if (curElem.id === id + color) {
          let newAmount = curElem.amount + amount;

          if (newAmount >= curElem.max) {
            newAmount = curElem.max;
          }
          return {
            ...curElem,
            amount: newAmount,
          };
        } else {
          return {
            curElem,
          };
        }
      });
      return { ...state, cart: updatedProduct };
    } else {
      let cartProduct = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.image[0].url,
        price: product.price,
        max: product.stock,
      };
      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }

  // to set the increment and decrement
  if (action.type === "DECREASE") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let decrementAmount = curElem.amount - 1;

        if (decrementAmount <= 1) {
          decrementAmount = 1;
        }

        return {
          ...curElem,
          amount: decrementAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  if (action.type === "INCREASE") {
    let updatedProduct = state.cart.map((curElem) => {
      if (curElem.id === action.payload) {
        let incrementAmount = curElem.amount + 1;

        if (incrementAmount >= curElem.max) {
          incrementAmount = curElem.max;
        }

        return {
          ...curElem,
          amount: incrementAmount,
        };
      } else {
        return curElem;
      }
    });
    return { ...state, cart: updatedProduct };
  }

  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curItem) => curItem.id !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  // to clear the cart
  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }


  if (action.type === "CART_TOTAL_ITEM") {
    let updatedItemValue = state.cart.reduce((initialVal, curElem) => {
      let {amount} = curElem;

      initialVal = initialVal + amount;
      return initialVal;
    }, 0)

    return {
      ...state,
      total_item: updatedItemValue,
    }
  }


  if (action.type === "CART_TOTAL_PRICE") {
    let total_price = state.cart.reduce((initialVal, curElem) => {
      let {price, amount} = curElem;

      initialVal = initialVal + (price * amount);

      return initialVal;
    }, 0)
    return {
      ...state,
      total_price: total_price,
    }
  }

  return state;
};

export default cartReducer;
