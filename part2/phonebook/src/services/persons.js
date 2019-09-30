import axios from 'axios'

const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  return axios.get(baseUrl)
    .then(res => res.data)
}

const create = newPerson => {
  return axios.post(baseUrl, newPerson)
    .then(res => res.data)
}

const remove = id => {
  return axios.delete(`${baseUrl}/${id}`)
}
 const update = person => {
  return axios.put(`${baseUrl}/${person.id}`, person)
    .then(res => res.data)
 }

export default {getAll, create, remove, update}