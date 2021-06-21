import axios from 'axios'

const baseUrl = `/api/persons`

const getAllContacts = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const createContact = (newContact) => {
    const request = axios.post(baseUrl,newContact)
    return request.then(response => response.data)
}

const deleteContact = (id) => {
    console.log(`${baseUrl}/${id}`)
    const request = axios.delete(`${baseUrl}/${id}`)
    return request
}

const updateContact = (id, newContact) => {
    const request =  axios.put(`${baseUrl}/${id}`, newContact)
    return request.then(response => response.data)
}
export default {getAllContacts, createContact, deleteContact, updateContact}