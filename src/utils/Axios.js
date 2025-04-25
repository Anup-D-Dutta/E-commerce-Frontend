// import axios from "axios";
// import SummaryApi , { baseURL } from "../common/SummaryApi";

// const Axios = axios.create({
//     // baseURL : baseURL,
//     baseURL : import.meta.env.VITE_API_URL,
//     withCredentials : true
// })

// //sending access token in the header
// Axios.interceptors.request.use(
//     async(config)=>{
//         const accessToken = localStorage.getItem('accesstoken')

//         if(accessToken){
//             config.headers.Authorization = `Bearer ${accessToken}`
//         }

//         return config
//     },
//     (error)=>{
//         return Promise.reject(error)
//     }
// )

// //extend the life span of access token with 
// // the help refresh
// Axios.interceptors.request.use(
//     (response)=>{
//         return response
//     },
//     async(error)=>{
//         let originRequest = error.config 

//         if(error.response.status === 401 && !originRequest.retry){
//             originRequest.retry = true

//             const refreshToken = localStorage.getItem("refreshToken")

//             if(refreshToken){
//                 const newAccessToken = await refreshAccessToken(refreshToken)

//                 if(newAccessToken){
//                     originRequest.headers.Authorization = `Bearer ${newAccessToken}`
//                     return Axios(originRequest)
//                 }
//             }
//         }
        
//         return Promise.reject(error)
//     }
// )


// const refreshAccessToken = async(refreshToken)=>{
//     try {
//         const response = await Axios({
//             ...SummaryApi.refreshToken,
//             headers : {
//                 Authorization : `Bearer ${refreshToken}`
//             }
//         })

//         const accessToken = response.data.data.accessToken
//         localStorage.setItem('accesstoken',accessToken)
//         return accessToken
//     } catch (error) {
//         console.log(error)
//     }
// }

// export default Axios;








import axios from "axios";
import SummaryApi, { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL: import.meta.env.VITE_API_URL || baseURL,
    withCredentials: true,
});

// REQUEST Interceptor: Add access token to headers
Axios.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accesstoken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// RESPONSE Interceptor: Handle 401 and refresh access token
Axios.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorage.getItem("refreshToken");

            if (refreshToken) {
                const newAccessToken = await refreshAccessToken(refreshToken);

                if (newAccessToken) {
                    localStorage.setItem("accesstoken", newAccessToken);
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return Axios(originalRequest);
                }
            }
        }

        return Promise.reject(error);
    }
);

// REFRESH Access Token Helper
const refreshAccessToken = async (refreshToken) => {
    try {
        const response = await axios({
            ...SummaryApi.refreshToken,
            baseURL: import.meta.env.VITE_API_URL || baseURL,
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
            withCredentials: true,
        });

        const newAccessToken = response.data?.data?.accessToken;
        return newAccessToken;
    } catch (error) {
        console.error("Refresh token failed:", error);
        return null;
    }
};

export default Axios;
