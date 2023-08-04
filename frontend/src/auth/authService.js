import axios from 'axios'



const API_URL = '/admin'


const register = async function(userData){
    const response = await axios.post(`${API_URL}/register`, userData)

    console.log(response.data)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

const logout = function(){
    localStorage.removeItem('user')
}

const login = async function(userData){
    const user = await axios.post(`${API_URL}/login`, userData)

    if(user.data){
        localStorage.setItem('user', JSON.stringify(user.data))
    }
    
    return user.data
}

const authService = {
    register:register,
    logout:logout,
    login:login
}

export default authService  