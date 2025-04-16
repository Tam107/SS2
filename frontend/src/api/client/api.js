import axios from "../axios.custom"
const registerUserApi = async(data)=>{
    try {
        const URL_LOGIN ='/users/register'
        const response = await axios.post(URL_LOGIN, data, {
            withCredentials: true,  // Đảm bảo gửi cookie
        });
        
        return response
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error?.response?.data?.message || "Error in axios"
            
        }
    }
}
const checkTokenOtp = async(data)=>{
    try {
        const URL_LOGIN ='/users/checkOtp'
        const response = await axios.post(URL_LOGIN,data,{withCredentials:true})
        return response
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error?.response?.data?.message || "Error in axios"
            
        }
    }
}

const loginApi = async(data)=>{
    try {
        const URL_LOGIN ='/users/login'
        const response = await axios.post(URL_LOGIN,data,{withCredentials:true})

        return response
        
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const getUserApi =async ()=>{
    try {
        const URL_LOGIN ='/users/getuser'
        const response = await axios.get(URL_LOGIN,{withCredentials:true})
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const userRegisterTeacherApi =async (id)=>{
    try {
        const URL_LOGIN ='/users/register-teacher/'+id
        const response = await axios.patch(URL_LOGIN)
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const loginAdminApi = async(data)=>{
    try {
        const URL_LOGIN ='/admin/login'
        const response = await axios.post(URL_LOGIN,data,{withCredentials:true})
        console.log(response);
        
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const getAdminApi = async()=>{
    try {
        const URL_LOGIN ='/admin/getAdmin'
        const response = await axios.get(URL_LOGIN,{withCredentials:true})
        return response
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const getUsersRegisteredApi = async()=>{
    try {
        const URL_LOGIN ='/users/getusersRegistered'
        const response = await axios.get(URL_LOGIN)

        return response
        
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
const updateUserRoleApi = async(id,data)=>{
    try {
        const URL_LOGIN ='/admin/updateUserRole/'+id
        const response = await axios.patch(URL_LOGIN,data)

        return response
        
    } catch (error) {
        return {
            success: false,
            message: error?.response?.data?.message||"Error in axios",
        }
    }
}
export {
    registerUserApi,
    checkTokenOtp,
    loginApi,
    getUserApi,
    loginAdminApi,
    getAdminApi,
    userRegisterTeacherApi,
    getUsersRegisteredApi,
    updateUserRoleApi
}