import Api from '@/services/Api'
import * as types from './mutation-types'

export default {
    [types.LOAD_CART](state,cart){
        state.cart = cart
    },
    [types.SET_CART](state, product) {
        var added_product = state.cart.products.find(added => 
            added.ID === product.ID
        )
        var added_index = state.cart.products.indexOf(added_product)
        if((added_index>-1) && (state.cart.products.length > 0))
        {
            // state.cart.products.map(cart_product=>
            //     cart_product.ID === added_product.ID? product:cart_product
            // )
            state.cart.products[added_index] = product
            console.log(state.cart.products);
            
        }
        else
            state.cart.products.push(product)
        state.cart.TotalPrice += product.Cost
    },
    [types.REMOVE_ITEM_IN_CART](state,ProductID){
        var deleted_product = state.cart.products.find(deleted => 
            deleted.ID === ProductID
        )
        var deleted_index = state.cart.products.indexOf(deleted_product)
        state.cart.products.splice(deleted_index,1)
    },
    [types.CART_CALCULATION](state){
        // state.cart.TotalPrice = 0
        if(state.cart.products.length>0)
        {
            state.cart.products.forEach(product => {
                totalPrice=product.Cost
            });
        }
        state.cart.TotalPrice.totalPrice
    },
    [types.EMPTY_CART](state){
        state.cart ={
            products:[],
            TotalPrice : 0
        }
    },
    [types.SET_USER](state,user){
        state.user = user
    },
    [types.LOGIN](state){
        state.pending = true
    },
    [types.LOGIN_SUCCESS](state){
        state.isLoggedIn = true
        state.pending = false
    },
    [types.LOGOUT](state){
        state.isLoggedIn = false
        state.user = null
    }
}