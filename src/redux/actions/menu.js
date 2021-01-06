import {SAVE_MENU_TITLE,DELETE_MENU_TITLE} from '../action_type'

export const createSetMenu = (title)=>{
    let menuTitle = ['home']
    let temp = localStorage.getItem('menuTitle')?JSON.parse(localStorage.getItem('menuTitle')):null
    if(!!temp){
        temp.push(title)
        return {type:SAVE_MENU_TITLE,data:title}
    }else{
        localStorage.setItem('menuTitle',JSON.stringify(menuTitle))
        return {type:SAVE_MENU_TITLE,data:menuTitle}
    }
}

export const createDelMenu = (title)=>{
    let temp = localStorage.getItem('menuTilt')?JSON.parse(localStorage.getItem('menuTitle')):[]
    let arr = []
    if(!!temp){
        arr = temp.filter((item)=>{
            return item !== title
        })
        localStorage.setItem('menuTitle',JSON.stringify(arr))
    }
    return {type:DELETE_MENU_TITLE,data:title}
}