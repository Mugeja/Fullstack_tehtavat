import axios from 'axios'
const baseUrl = '/persons'

const getAll = () => {
  console.log("tässä ollaan")
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return (request.then(response => response.data) )
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
    axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, deletePerson }
