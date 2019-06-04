import Api from '@/services/Api'
//ImportService such as create import, fetch import
export default {
  createImport (data) {
    return Api().post('api/import', data)
  },
  getImport () {
    return Api().get('api/import')
  },
  getImportByID (id) {
    return Api().get(`api/import/${id}`)
  },
  getImportDetailByID(id) {
    return Api().get(`api/import/detail/${id}`)
  },
  deleteImport (id) {
    return Api().delete(`api/import/${id}`)
  },
  updateImport (data) {
    return Api().put(`api/import/${data.ID}`,data)
  }
}