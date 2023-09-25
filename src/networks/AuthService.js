import BaseService from './BaseService'

class AuthService extends BaseService {
  login(payload) {
    this.endPoint = '/LoginUser'
    return this.postNoAuth(payload)
  }
}

export default new AuthService