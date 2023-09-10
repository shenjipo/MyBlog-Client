import { http } from "./axios"

/* 登录接口参数类型 */
interface Blog {
    content: string,
    title: string,
}



export class ArticleManageApi {
    static queryAll(params?: any): Promise<Array<Blog>> {
        return http.post<Array<Blog>>('/queryAll').then(res => {
            return res
        }).catch((err: any) => {
            return err
        })
    }

    static uploadImg(file: { miniurl: string, name: string, lastModified: number, lastModifiedDate: any, size: number, type: string }) {
        var formData = new FormData();     //新建一个表单数据,用于提交文件
        formData.append("img", file as any);     //添加文件,参数分别是表单参数的名字和值.
        return http.post('/uploadImg', formData, {
            headers: {
                "Content-Type": "multipart/form-data"    //设置请求头,更换内容类型为表单数据
            }
        }).then(res => {
            return res
        }).catch((err: any) => {
            return err
        })
    }
}