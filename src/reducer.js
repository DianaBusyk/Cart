const reducer = (state, action) => {
  switch (action.type) {
    case "CLEAR_CART":
      return { ...state, cart: [] };
    case "REMOVE":
      return {
        ...state,
        cart: state.cart.filter((cartItem) => cartItem.id != action.payload),
      };
    case "INCREASE":
      let incCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload) {
          return { ...cartItem, amount: cartItem.amount + 1 };
        }
        return cartItem;
      });
      return { ...state, cart: incCart };
    case "DECREASE":
      let decCart = state.cart.map((cartItem) => {
        if (cartItem.id === action.payload) {
          if (cartItem.amount > 1) {
            return { ...cartItem, amount: cartItem.amount - 1 };
          }
          return cartItem;
        }
        return cartItem;
      });
      return { ...state, cart: decCart };
    case "GET_TOTALS":
      let { total, amount } = state.cart.reduce(
        (cartTotal, cartItem) => {
          const { price, amount } = cartItem;
          const itemTotal = price * amount;
          cartTotal.total += itemTotal;
          cartTotal.amount += amount;
          return cartTotal;
        },
        {
          amount: 0,
          total: 0,
        }
      );

      total = parseFloat(total.toFixed(2));
      return { ...state, total, amount };

    default:
      return state;
  }
};

export default reducer;
