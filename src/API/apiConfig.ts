export const BASE_URL = 'http://localhost:3002/api/v1';

export const API_ENDPOINTS = {
    AUTH: {
        SIGNUP: '/register',
        LOGIN: 'login',
    },
    POST: {
        PUBLIC_ACTIONS: {
            GET_ALL_POSTS: '/posts',
            GET_POST_BY_ID: (id: string) => `/posts/${id}`,
            GET_LEADERBOARD: '/posts/leaderboard',
        },
        AUTHOR_ACTIONS: {
            GET_AUTHOR_POSTS: '/posts/my',
            PUBLISH_POSTS: '/posts' ,
            UPDATE_POSTS: (id: string) => `/posts/${id}`,
            ARCHIVE_OR_PUBLISH_POST: (id: string) => `/posts/${id}/status`,
            DELETE_POST: (id: string) => `/posts/${id}`,
        }
    }
}