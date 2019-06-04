import Api from '@/services/Api'
//ProductStorageService such as add, edit, remove, fetch
export default {
  getProduct () {
    return Api().get('api/product')
  },
  getProductByID (id) {
    return Api().get(`api/product/${id}`)
  },
  getProductByCategory (category) {
    return Api().get(`api/product/category/${category}`)
  },
  createProduct (data) {
    return Api().post('api/product',data)
  },
  deleteProduct (id) {
    return Api().delete(`api/product/${id}`)
  },
  updateProduct (data) {
    return Api().put(`api/product/${data.ID}`,data)
  }
}