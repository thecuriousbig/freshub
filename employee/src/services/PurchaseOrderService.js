import Api from '@/services/Api'
//purchaseOrderService such as createPurchaseOrder, fetchPurchaseOrder
export default {
  createPurchaseOrder(data) {
    return Api().post('api/purchaseorder', data)
  },
  getPurchaseOrder() {
    return Api().get('api/purchaseorder')
  },
  getPurchaseOrderByID (id) {
    return Api().get(`api/purchaseorder/${id}`)
  },
  getPurchaseOrderDetailByID (id) {
    return Api().get(`api/purchaseorder/detail/${id}`)
  },
  deletePurchaseOrder(id) {
    return Api().delete(`api/purchaseorder/${id}`)
  },
  updatePurchaseOrder(data) {
    return Api().put(`api/purchaseorder/${data.ID}`,data)
  }
}