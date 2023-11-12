import axios from 'axios'
import type { AxiosInstance, AxiosResponse } from 'axios'
import type { AxiosError, InternalAxiosRequestConfig, AxiosRequestConfig } from 'axios'
import { Message } from '@arco-design/web-vue';
import { router } from '@/router/router'

const service: AxiosInstance = axios.create({
    // '/api' 配置代理
    baseURL: process.env.VUE_APP_BASE_API,
    timeout: 30000
})


//
/* 请求拦截器 */
service.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const noTokenUrl = ['/login', '/queryBlogListExceptContent', '/queryBlogByIdNoToken']

    //  伪代码
    if (!noTokenUrl.includes(config.url as string) && !localStorage.getItem('token')) {
        Message.error('账号已失效，请重新新登录！');


        router.push({
            name: 'login'
        })

        return Promise.reject('err')
    }

    config.headers.setAuthorization(localStorage.getItem('token') || '')

    return config
}, (error: AxiosError) => {
    console.log(error)
    Message.error(error.message);
    return Promise.reject(error)
})

/* 响应拦截器 */
service.interceptors.response.use((response: AxiosResponse) => {
    const { code, msg, data } = response.data
    const customData = response.config.data
    if (customData) {
        console.log(JSON.parse(customData))
    }

    // 根据自定义错误码判断请求是否成功
    if (code === 200) {
        // 将组件用的数据返回
        return data
    } else {

        // 处理业务错误。
        if (code === 403) {
            router.push('/login')
        }
        return Promise.reject({ message: msg })
    }
}, (error: AxiosError) => {
    console.log(error)
    // 处理 HTTP 网络错误
    let message = ''
    // HTTP 状态码
    const status = error.response?.status
    switch (status) {
        case 401:
            message = '401 token 失效，请重新登录'
            // 这里可以触发退出的 action
            break;
        case 403:
            message = '403 拒绝访问'
            break;
        case 404:
            message = '404 请求地址错误'
            break;
        case 500:
            message = '500 服务器故障'
            break;
        default:
            message = '网络连接故障'
    }
    error.message = message
    return Promise.reject(error)
})


/* 导出封装的请求方法 */
export const http = {
    get<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
        return service.get(url, config)
    },

    post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        return service.post(url, data, config)
    },

    put<T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T> {
        return service.put(url, data, config)
    },

    delete<T = any>(url: string, config?: InternalAxiosRequestConfig): Promise<T> {
        return service.delete(url, config)
    }
}
