import Staff from '@/services/StaffService'
import AuthenticationService from '@/services/AuthenticationService'
import Mutation from './mutations'
import * as types from './mutation-types'

export default {
    async [types.GET_STAFF]({commit}){
        const staff = JSON.parse(localStorage.getItem('staff'))
        commit(types.SET_STAFF,staff)
    },
    async [types.LOGIN_STAFF]({commit},credentials){
        commit(types.LOGIN_STAFF)
        const {staff,token} = (await AuthenticationService.login(credentials)).data
        localStorage.setItem('staff',JSON.stringify({
            FirstName : staff.FirstName,
            LastName : staff.LastName,
            Email: staff.Email,
            TelNo : staff.TelNo,
            Address : staff.Address,
            PositionID: staff.PositionID,
            token: token    
        }))
        commit(types.SET_STAFF,{staff,token})
        commit(types.LOGIN_SUCCESS_STAFF)
    },
    async [types.LOGOUT_STAFF]({commit}){
        localStorage.removeItem('staff')
    },
    async [types.REGISTER_STAFF]({commit,dispatch},credentials){
        const staff_reg = (await Staff.createStaff(credentials)).data
        await dispatch('LOGIN_STAFF',{
            email: credentials.email,
            password: credentials.password
        })
    }
}