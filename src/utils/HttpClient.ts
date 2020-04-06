import axios from 'axios'
class HttpClient {
    static post<T>(url: string, data: object) {
        return new Promise<T>((resolve,reject) => {
            axios.post<T>(url,data,{
                transformRequest: [function (data) {
                    const query =  Object.keys(data).map(k =>
                        encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
                    )
                        .join('&');
                    return query;
                }],
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
            }).then((res)=>{
                if(res.status === 200){
                    resolve(res.data);
                }else {
                    reject();
                }
            })
        })
    }
    static get<T>(url:string,params:object) {

        return new Promise<T>((resolve,reject) => {
            axios.get<T>(url,{
                params:params,
                paramsSerializer: function(params) {
                    return Object.keys(params).map(k =>
                        encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
                    )
                        .join('&')
                },
            }).then((res)=>{
                if(res.status === 200) {
                    resolve(res.data);
                }else {
                    reject();
                }
            })
        })
    }
}

export { HttpClient }
