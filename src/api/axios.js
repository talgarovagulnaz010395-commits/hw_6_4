import axios from "axios";

export const api = axios.create({
    baseURL: "https://nu.tipo.lol/api",
    headers: {
        "Content-Type": "application/json",
    }
})
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
(error) => Promise.reject(error)
)
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {

            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem("refreshToken");

                const res = await api.post('http://nu.tipo.lol/api/auth/refresh', {refreshToken});

                localStorage.setItem('accessToken', res.data.accessToken);

                originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

                return api(originalRequest);
            }
            catch (error) {
                // localStorage.clear();
                console.log(error);
                // window.location.href="/login";

            }

        }
        return Promise.reject(error);
    }
)