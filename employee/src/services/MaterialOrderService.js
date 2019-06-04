import Api from '@/services/Api'
//MaterialOrderService such as create material order, fetch material order
export default {
  createMaterialOrder (data) {
    return Api().post('api/materialorder', data)
  },
  getMaterialOrder () {
    return Api().get('api/materialorder')
  },
  getMaterialOrderByID (id) {
    return Api().get(`api/materialorder/${id}`)
  },
  getMaterialOrderDetailByID(id) {
    return Api().get(`api/materialorder/detail/${id}`)
  },
  deleteMaterialOrder (id) {
    return Api().delete(`api/materialorder/${id}`)
  },
  updateMaterialOrder (data) {
    return Api().put(`api/materialorder/${data.ID}`,data)
  }
}