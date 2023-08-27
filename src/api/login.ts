import { http } from "./axios"

/* 登录接口参数类型 */
export interface Response<T> {
    code: number,
    msg: string,
    data: T
}
interface User {
    account: string,
    id: number
}
interface LoginData {
    token: string,
    user: User
}
export class Api {
    static login(params: any): Promise<LoginData> {
        return http.post<LoginData>('/login', params).then(res => {
            return res
        }).catch((err: any) => {
            return err
        })
    }
}