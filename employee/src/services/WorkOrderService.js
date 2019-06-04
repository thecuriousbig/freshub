import Api from '@/services/Api'

//WorkOrderService such as createWorkOrder, fetchWorkOrder etc.
export default {
  createWorkOrder(data) {
    return Api().post('api/workorder', data)
  },
  getWorkOrder() {
    return Api().get('api/workorder')
  },
  getWorkOrderByID (id) {
    return Api().get(`api/workorder/${id}`)
  },
  deleteWorkOrder(id) {
    return Api().delete(`api/workorder/${id}`)
  },
  updateWorkOrder(data) {
    return Api().put(`api/workorder/${data.ID}`,data)
  }
}
