import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        cart : {
            products:[],
            TotalPrice : 0
        } || !!localStorage.getItem('cart'),
        user: null,
        isLoggedIn:false || !!localStorage.getItem('user'),
        pending:false,
    },
    getters,
    mutations,
    actions
})
export default store;