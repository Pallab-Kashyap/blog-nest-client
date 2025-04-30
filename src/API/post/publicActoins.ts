import { API_ENDPOINTS } from "../apiConfig"
import { axiosInstance } from "../axiosConfig"

export const getAllPosts = async () => {
    const res = await axiosInstance.get(API_ENDPOINTS.POST.PUBLIC_ACTIONS.GET_ALL_POSTS)
    return res.data
} 