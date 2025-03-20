import axios from "axios";
import SummaryApi , { baseURL } from "../common/SummaryApi";

const Axios = axios.create({
    baseURL : baseURL,
    withCredentials : true
})

//sending access token in the header
Axios.interceptors.request.use(
    async(config)=>{
        const accessToken = localStorage.getItem('accesstoken')

        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

//extend the life span of access token with 
// the help refresh
Axios.interceptors.request.use(
    (response)=>{
        return response
    },
    async(error)=>{
        let originRequest = error.config 

        if(error.response.status === 401 && !originRequest.retry){
            originRequest.retry = true

            const refreshToken = localStorage.getItem("refreshToken")

            if(refreshToken){
                const newAccessToken = await refreshAccessToken(refreshToken)

                if(newAccessToken){
                    originRequest.headers.Authorization = `Bearer ${newAccessToken}`
                    return Axios(originRequest)
                }
            }
        }
        
        return Promise.reject(error)
    }
)


const refreshAccessToken = async(refreshToken)=>{
    try {
        const response = await Axios({
            ...SummaryApi.refreshToken,
            headers : {
                Authorization : `Bearer ${refreshToken}`
            }
        })

        const accessToken = response.data.data.accessToken
        localStorage.setItem('accesstoken',accessToken)
        return accessToken
    } catch (error) {
        console.log(error)
    }
}

export default Axios


// import axios from "axios";
// import SummaryApi, { baseURL } from "../common/SummaryApi";

// const Axios = axios.create({
//   baseURL: baseURL,
//   withCredentials: true,
// });

// // ✅ Sending access token in the request header
// Axios.interceptors.request.use(
//   async (config) => {
//     const accessToken = localStorage.getItem("accesstoken");

//     if (accessToken) {
//       config.headers.Authorization = `Bearer ${accessToken}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // ✅ Handle expired access token with refresh token
// Axios.interceptors.response.use(
//   (response) => response, // ✅ Pass successful responses
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // ✅ Prevent infinite loops

//       const refreshToken = localStorage.getItem("refreshToken");

//       if (refreshToken) {
//         const newAccessToken = await refreshAccessToken(refreshToken);

//         if (newAccessToken) {
//           originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//           return Axios(originalRequest); // ✅ Retry failed request
//         }
//       }
//     }

//     return Promise.reject(error);
//   }
// );

// // ✅ Function to refresh access token
// const refreshAccessToken = async (refreshToken) => {
//   try {
//     const response = await axios({
//       ...SummaryApi.refreshToken, // ✅ Use axios directly, not Axios instance to avoid loops
//       headers: {
//         Authorization: `Bearer ${refreshToken}`,
//       },
//     });

//     const accessToken = response.data.data.accessToken;
//     localStorage.setItem("accesstoken", accessToken);
//     return accessToken;
//   } catch (error) {
//     console.error("Refresh token expired or invalid", error);
//     localStorage.removeItem("accesstoken"); // ❌ Clear expired token
//     localStorage.removeItem("refreshToken"); // ❌ Clear expired refresh token
//     window.location.href = "/login"; // ✅ Redirect to login page
//     return null;
//   }
// };

// export default Axios;
