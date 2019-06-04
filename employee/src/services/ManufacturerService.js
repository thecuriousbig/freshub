import Api from '@/services/Api'
//ImportService such as create import, fetch import
export default {
  getManufacturer() {
    return Api().get('api/manufacturer')
  },
  getManufacturerByID(id) {
    return Api().get(`api/manufacturer/${id}`)
  },
  
}