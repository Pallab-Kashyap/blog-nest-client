import { API_ENDPOINTS } from "./apiConfig"
import { axiosInstance } from "./axiosConfig"

export const signup = async (data) => {
    const res = await axiosInstance.post(API_ENDPOINTS.AUTH.SIGNUP, data)
    return res.data
}

export const login = async (data) => {
    const res = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, data)
    return res.data
}