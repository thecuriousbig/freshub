import * as types from './mutation-types'

export default{
    [types.SET_STAFF](state,staff){
        state.staff = staff
    },
    [types.LOGIN_STAFF](state){
        state.pending = true
    },
    [types.LOGIN_SUCCESS_STAFF](state){
        state.isStaffLogedIn = true
        state.pending = false
    },
    [types.LOGOUT_STAFF](state){
        state.isStaffLogedIn = false
        state.staff = null
    }
}