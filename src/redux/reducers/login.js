import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_type'

const user_info = localStorage.getItem('userInfo')
const user_token = localStorage.getItem('token')

let initState = {
    userInfo:user_info||{},
    token:user_token||{},
    isLogin:(user_info && user_token) ? true : false
}

export default function (preState=initState,action) {
    const {data,type} = action
    let newData = {}
    switch (type) {
        case SAVE_USER_INFO:
            const {userInfo,token} = data
            newData = {userInfo:userInfo,token,isLogin:true}
            return newData
        case DELETE_USER_INFO:
            newData = {userInfo:{},token:'',isLogin:false}
            return newData
        default:
            return preState
    }
}