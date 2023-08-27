import { http } from "./axios"

/* 登录接口参数类型 */
interface Blog {
    content: string,
    title: string,
}


export class articleManage {
    static queryAll(params?: any): Promise<Array<Blog>> {
        return http.post<Array<Blog>>('/queryAll').then(res => {
            return res
        }).catch((err: any) => {
            return err
        })
    }
}