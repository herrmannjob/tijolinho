import axios from 'axios'

const urls = {
  baseURL: '',
  login: ''
}

const api = axios.create({
  baseURL: urls.baseURL
})

export { api, urls }
