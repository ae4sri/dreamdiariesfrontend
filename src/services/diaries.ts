import axios from 'axios'
const baseUrl = '/api/diaries'
let token: string | null = null

const setToken = (newToken: string) => {  token = `bearer ${newToken}`} // function exported and used by app component to set authentification token

const getPublicDiaries = async () => { // get all public diaries from backend
    const config = {    headers: { Authorization: token },  }
    const response = await axios.get(baseUrl, config )
    return response.data
}

const createDiary = async (diary: { title: string, text: string, priv: boolean}) => { // create new diary given object
    const config = {    headers: { Authorization: token },  }
    const response = await axios.post(baseUrl, diary, config )
    return response.data
}

const getUsersDiaries = async () => { // get diaries for current user
    const config = {    headers: { Authorization: token },  }
    const response = await axios.get(`${baseUrl}/currentUserDiaries`, config)
    return response.data

}

const changeDiaryPrivacy = async (newPrivacySetting: boolean, id: string) => { // change a diary's privacy setting
    const config = {    headers: { Authorization: token },  }
    const editObject = { priv: newPrivacySetting }
    const response = await axios.put(`${baseUrl}/${id}`, editObject, config)
    return response.data

}

const editDiary = async (id: string, text: string, priv: boolean) => { // change a diary's text field
    const config = {    headers: { Authorization: token },  }
    const editObject = { text, priv }
    const response = await axios.put(`${baseUrl}/${id}`, editObject, config)
    return response.data
}

const deleteDiary = async (id: string) => { // delete a diary
    const config = {    headers: { Authorization: token },  }
    const response = await axios.delete(`${baseUrl}/${id}`, config)
    return response.data
}
export default {
    createDiary,
    setToken,
    getPublicDiaries,
    getUsersDiaries,
    changeDiaryPrivacy,
    editDiary,
    deleteDiary
}