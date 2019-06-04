import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import mutations from './mutations'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        staff:{
            FirstName:'',
            LastName:'',
            Email:'',
            TelNo:'',
            Address:'',
            PositionID:null,
            token: ''
        },
        pending : false,
        isStaffLogedIn: false || !!localStorage.getItem('staff')
    },
    getters,
    mutations,
    actions
})
export default store;