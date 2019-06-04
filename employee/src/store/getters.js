export default {
    staff(state){
        return state.staff
    },
    isAdmin(state){
        return state.staff.PositionID===1
    },
    isStaffLoggedIn(state){
        return state.isStaffLogedIn
    }
}