export default{
    cart(state){
        return state.cart
    },
    cart_amount(state){
        return state.cart.products.length
    },
    TotalPrice(state){
        return state.cart.TotalPrice
    },
    user(state){
        return state.user
    },
    isLoggedIn(state){
        return state.isLoggedIn
    }
}