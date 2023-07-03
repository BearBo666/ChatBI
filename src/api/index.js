import axios from 'axios'

const request = axios.create({
    baseURL: 'https://chatlaw.cloud/chatlaw',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "X-Token": "CpenZRg3sGmU2F7QBxojzbdMyvHX84h0"
    }
})
// 响应拦截器
request.interceptors.response.use(
    response => response.data,
    error => Promise.reject(error)
)

// 提问
export function getAnswer(data) {
    return request({
        url: '/chat_stream_pro',
        method: 'post',
        data
    })
}