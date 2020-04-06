import {HttpClient} from "../utils/HttpClient";

export interface IInfoList {
    iflow:{
        cure_cnt: number
        cure_cnt_incr: number
        die_cnt: number
        die_cnt_incr: number
        incr_day: string
        is_incr_yesterDay: boolean
        like_cnt: number
        like_cnt_incr: number
        statisEndTime: string
        sure_cnt: number
        sure_cnt_incr: number
    },
    provinces:Array<{
        cure_cnt: number,
        province:string,
        sure_cnt:number,
        die_cnt:number
    }>,
    cities:Array<{
        city: string
        citycode: number
        country: "中国"
        cure_cnt: number
        die_cnt: number
        districts_sure_str: null | string
        like_cnt: null |number
        one_level_area: string
        province: string
        sure_cnt: number
        two_level_area: string
        _id: string
    }>,
    trends:Array<{
        cure_cnt: number
        day: number
        die_cnt: number
        hubei_sure_cnt: number
        like_cnt: number
        like_new_cnt: number
        sure_cnt: number
    }>
}
export function getInfoList(data:{
    trend:number,
    iflow:number,
    district:number,
    uc_param_str:string
}) {
    const url = 'https://iflow-api.uc.cn/feiyan/list';
    return HttpClient.get<{
        code:number,
        data:IInfoList,
        message:string
    }>(url,{...data})
}

export interface INewsProgressList {
    desc: string
    id: number
    jumpText: string
    label: string
    newsId: string
    newsTime: string
    updateTime: string
    url: string
}
export function  getNewsProgress(data:{
    num:number,
    bkn:number
}) {
const url = 'https://m.gamefeeds.qq.com/activity-cgi/news/news-time-line/time-line-list'
    return HttpClient.get<{
        code:number,
        data:{
            dataList:Array<INewsProgressList>
        },
        message:string
    }>(url,{...data})
}
