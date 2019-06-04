import axios from 'axios'
//Promise based HTTP client for the browser and node.js
export default () => {
  return axios.create({
    baseURL: `http://localhost:8082`
  })
}
