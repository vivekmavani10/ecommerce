const ProductReducer = (state, action) => {
  // method 1    using if statement

  // if (action.type === "LOADING_PRODUCTS") {
  //     return {
  //         ...state,
  //         isLoading: true
  //     };
  // }

  // if (action.type === "API_ERROR") {
  //     return {
  //         ...state,
  //         isLoading: false,
  //         isError: true,
  //     }
  // }

  // method 2   using switch

  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: true,
      };

    case "SET_API_DATA":
      const featureData = action.payload.filter((curElem) => {
        return curElem.featured === true;
      });

      return {
        ...state,
        isLoading: false,
        products: action.payload,
        featuredProducts: featureData,
      };

    case "API_ERROR":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };

    case "SET_SINGLE_LOADING":
      return {
        ...state,
        isSingleLoading: true,
      };

    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        isSingleLoading: false,
        singleProduct: action.payload,
      };

    case "SET_SINGLE_ERROR":
      return {
        ...state,
        isSingleLoading: false,
        isError: true,
      };

    default:
      return state;
  }
  // return state
};

export default ProductReducer;
