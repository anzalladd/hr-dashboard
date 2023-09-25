import axios from 'axios'
import config from './config'

class BaseService {
  endPoint

  useApi

  token

  http

  constructor() {
    this.http = axios.create({})
    this.endPoint = ''
    this.useApi = ''
    this.token = window.localStorage.getItem('access_token') || ''
    this.setBaseUrl()
  }

  setBaseUrl() {
    this.http = axios.create({
      headers: {
        Accept: 'application/json'
      },
      baseURL: config.BASE_URL
    })
  }

  async includeDefaultOptions(options = {}) {
    const accessToken = await window.localStorage.getItem('access_token')
    this.setBaseUrl()
    if (accessToken !== null) {
      const defaultData = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`
        }
      }
      return Object.assign(options, defaultData)
    }
    return options
  }

  async get(options = {}) {
    const opts = await this.includeDefaultOptions(options)
    try {
      const {
        data: { data: response }
      } = await this.http.get(this.endPoint, opts)
      return response
    } catch (e) {
      if (e.response.status === 401) {
        window.localStorage.clear()
      }
      return null
    }
  }

  async getNoAuth(options = {}, api = '') {
    this.useApi = api
    this.setBaseUrl()
    const data = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const opts = Object.assign(options, data)
    try {
      const {
        data: { data: response }
      } = await this.http.get(this.endPoint, opts)
      return response
    } catch (e) {
      if (e.response.status === 401) {
        window.localStorage.clear()
      }
      return null
    }
  }

  async post(payload, options = {}) {
    const opts = await this.includeDefaultOptions(options)
    try {
      const {
        data: { data: response }
      } = await this.http.post(this.endPoint, payload, opts)
      return response
    } catch (e) {
      if (e.response.status === 401) {
        window.localStorage.clear()
      }
      return null
    }
  }

  async postNoAuth(payload, options = {}) {
    this.setBaseUrl()
    const data = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    const opts = Object.assign(options, data)
    const {
      data: { data: response }
    } = await this.http.post(this.endPoint, payload, opts)
    return response
  }

  async patch(payload, options = {}) {
    const opts = await this.includeDefaultOptions(options)
    const {
      data: { data: response }
    } = await this.http.patch(this.endPoint, payload, opts)
    return response
  }

  async put(payload, options = {}) {
    const opts = await this.includeDefaultOptions(options)
    const {
      data: { data: response }
    } = await this.http.put(this.endPoint, payload, opts)
    return response
  }

  async delete(options = {}) {
    const opts = await this.includeDefaultOptions(options)
    const {
      data: { data: response }
    } = await this.http.delete(this.endPoint, opts)
    return response
  }
}

export default BaseService
