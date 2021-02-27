import axios from "axios"

const appProvider = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_API_URL
})

export default appProvider;


