import {SAVE_MENU_TITLE, DELETE_MENU_TITLE} from '../action_type'

const menuTitle = localStorage.getItem('menuTitle')?JSON.parse(localStorage.getItem('menuTitle')):['home']

let initState = ['home']

export default function (preState=initState,action) {
    const {data,type} = action;
    let newData = menuTitle;
    switch (type) {
        case SAVE_MENU_TITLE:
            newData.push(data);
            return newData;
        case DELETE_MENU_TITLE:
            return data;
        default:
            return preState;
    }
}