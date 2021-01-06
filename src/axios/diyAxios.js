import axios from 'axios'
import qs from 'querystring'
import {message} from 'antd'
import store from "../redux/store";

axios.defaults.baseURL='http://localhost:4000'

axios.interceptors.request.use((config)=>{
    //1.获取token
    let {token} = store.getState().userInfo
    if(token){
        config.headers.Authorization = token
    }
    return config
})

axios.interceptors.response.use(
    response => {
        return response.data
    },
    err => {
        if(err.status === 401){
            message.error('身份过期，请重新登录')
            store.dispatch(createDeleteUserAction())
            store.dispatch(createSaveTitleAction(''))
        }else{
            message.error(err.message)
        }
        return new Promise(()=>{})
    }
)
export default axios