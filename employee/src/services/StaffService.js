import Api from '@/services/Api'
//StaffListService such as view staff list
export default {
  getStaff() {
    return Api().get('api/staff')
  },
  getStaffByID (id) {
    return Api().get(`api/staff/${id}`)
  },
  deleteStaff(id) {
    return Api().delete(`api/staff/${id}`)
  },
  updateStaff(data) {
    return Api().put(`api/staff/${data.ID}`, data)
  },
  createStaff(data) {
    return Api().post('api/staff',data)
  }
}