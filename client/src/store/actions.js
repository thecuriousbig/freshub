import Api from '@/services/Api'
import AuthenticationService from '@/services/AuthenticationService'
import Mutation from './mutations'
import * as types from './mutation-types'

export default {
    [types.GET_CART]({commit}){
        var cart = JSON.parse(localStorage.getItem('cart'))
        if(cart){
            commit(types.LOAD_CART,cart)
        }
    },
    [types.ADD_TO_CART]({commit,dispatch},product){
        commit(types.SET_CART,product)
        dispatch(types.UPDATE_CART)
    },
    [types.UPDATE_CART]({commit,state}){
        localStorage.setItem('cart',JSON.stringify(state.cart))    
        commit(types.CART_CALCULATION)
    },
    [types.DELETE_PRODUCT_IN_CART]({commit,dispatch},ProductID){
        commit(types.REMOVE_ITEM_IN_CART)
        dispatch(types.UPDATE_CART)
    },
    [types.RESET_CART]({commit}){
        commit(types.EMPTY_CART)
        localStorage.removeItem('cart')
    },
    async [types.CREATE_PO]({state},PO){
        var cart_arr = state.cart.products.map(product => 
            product = {ProductID : product.ID,Amount:product.Quantity}
        )
        const response = await Api().post('api/purchaseorder',{
            ...PO,
            CartList:cart_arr
        })
        console.log(response);
        
    },
    async [types.GET_USER]({commit}){
        const user = JSON.parse(localStorage.getItem('user'))
        commit(types.SET_USER,user)
    },
    async [types.LOGIN]({commit},credentials){
        commit(types.LOGIN)
        const {user,token} = (await AuthenticationService.login(credentials)).data
        localStorage.setItem('user',JSON.stringify({
            ID:user.ID,
            UserName: user.UserName,
            FirstName : user.FirstName,
            LastName : user.LastName,
            Email: user.Email,
            TelNo : user.TelNo,
            Address : user.Address,
            token: token    
        }))
        commit(types.SET_USER,{user,token})
        commit(types.LOGIN_SUCCESS)
    },
    async [types.LOGOUT]({commit}){
        localStorage.removeItem('user')
    },
    async [types.REGISTER_USER]({commit,dispatch},credentials){
        const user_reg = (await AuthenticationService.register(credentials)).data
        await dispatch('LOGIN_USER',{
            username: credentials.username,
            email: credentials.email,
            password: credentials.password,
        })
    }
}