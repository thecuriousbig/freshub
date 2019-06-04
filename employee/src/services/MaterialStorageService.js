import Api from '@/services/Api'
//MaterialStorageService such as edit add remove and fetching
export default {
  createMaterial (data) {
    return Api().post('api/material',data)
  },
  getMaterial () {
    return Api().get('api/material')
  },
  getMaterialByID (id) {
    return Api().get(`api/material/${id}`)
  },
  deleteMaterial (id) {
    return Api().delete(`api/material/${id}`)
  },
  updateMaterial (data) {
    return Api().put(`api/material/${data.ID}`,data)
  }
}