import {combineReducers} from 'redux'
import loginReducers from './login'
import menuReducers from './menu'

export default combineReducers({
    userInfo:loginReducers,
    menuTitle:menuReducers
})