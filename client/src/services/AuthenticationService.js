import Api from '@/services/Api'

//Authenticate service such as registration
export default {
  register(credentials) {
    return Api().post('api/user/register', credentials)
  },
  login(credentials) {
    return Api().post('api/user/login', credentials)
  }
}
