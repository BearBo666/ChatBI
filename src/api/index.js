import axios from 'axios'

const request = axios.create({
    baseURL: 'https://43.154.178.61',
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

// 设置表
export function setTable(data) {
    return request({
        url: '/set_table',
        method: 'post',
        data
    })
}

// 提问
export function query(data) {
    return request({
        url: '/upload_query',
        method: 'post',
        data
    })
}