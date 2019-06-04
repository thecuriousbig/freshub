import Api from '@/services/Api'

//Authenticate service such as registration
export default {
  login (credentials) {
    return Api().post('/api/staff/login', credentials)
  }
}
