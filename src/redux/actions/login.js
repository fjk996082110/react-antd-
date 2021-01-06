import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_type'

export const createSaveUserInfo = (userObj)=>{
    localStorage.setItem('userInfo',JSON.stringify(userObj.userInfo));
    localStorage.setItem('token',userObj.token);
    return {type:SAVE_USER_INFO,data:userObj};
}
export const createDeleteUserInfo = (userObj)=>{
    localStorage.clear();
    return {type:DELETE_USER_INFO,data:{}};
}
