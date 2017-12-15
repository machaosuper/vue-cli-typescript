import Axios from './process'
import { AxiosResponse } from 'axios'
import { IConfigAdapter, serverConfig } from './config'
interface IHttp {
  /**
   * get请求
   * @param api 请求接口
   * @param params 请求参数
   * @param config 请求配置参数
   */
  get<T, K, V> (api: string, params?: K): Promise<T>
  /**
   * post请求
   * @param api 请求接口
   * @param params 请求参数
   * @param config 请求配置参数
   */
  post<T, K, V> (api: string, params?: K, config?: V): Promise<T>
}
class Http implements IHttp {
  private configAdapter: IConfigAdapter

  constructor () {
    this.configAdapter = serverConfig
  }
  get<T, K, V> (api: string, params?: K): Promise<T> {
    return Axios.get(api, params).then<T>(this.fulfilled)
  }
  post<T, K, V> (api: string, params?: K, config?: V): Promise<T> {
    return Axios.post(api, params, config).then<T>(this.fulfilled)
  }

  private fulfilled = <T>(res: AxiosResponse) => {
    const promise = new Promise<T>((resolve, reject) => {
      if (res.data.hasOwnProperty('code') && String(res.data.code) === this.configAdapter.successCode) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    })
    return promise
  }
}
// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
  install: function (Vue, Option) {
    Object.defineProperty(Vue.prototype, '$http', { value: new Http() })
  }
}
