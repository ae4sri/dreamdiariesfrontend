import axios from 'axios'
const baseUrl = '/api/users'

const createUser = async (newUser: { username: string, password: string}) => {
    const res = await axios.post(baseUrl, newUser)
    return res.data
  }

  export default {
      createUser
  }