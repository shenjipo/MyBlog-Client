import { http } from "./axios"
import { Account } from "@/model/Account"
/* 登录接口参数类型 */
export interface Response<T> {
    code: number,
    msg: string,
    data: T
}

interface LoginData {
    token: string,
    user: Account
}
export class Api {
    static login(params: any): Promise<LoginData> {
        return http.post<LoginData>('/login', params).then(res => {
            return res
        }).catch((err: any) => {

            return Promise.reject(err)
        })
    }
}