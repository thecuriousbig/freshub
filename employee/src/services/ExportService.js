import Api from '@/services/Api'
//ExportService such as create export, fetch export list
export default {
  createExport (data) {
    return Api().post('api/export', data)
  },
  getExport () {
    return Api().get('api/export')
  },
  getExportByID (id) {
    return Api().get(`api/export/${id}`)
  },
  getExportDetailByID (id) {
    return Api().get(`api/export/detail/${id}`)
  },
  deleteExport (id) {
    return Api().delete(`api/export/${id}`)
  },
  updateExport (data) {
    return Api().put(`api/export/${data.ID}`,data)
  }
}