import React,{Component} from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import Login from './component/login'
import Home from "./component/home";
import MenuIndex from './component/menu/menu'

export default class App extends Component{
    render() {
        return (
            <Switch>
                <Route path='/login' component={Login} />
                <Route path='/home' component={MenuIndex} />
                <Redirect to="/login"/>
            </Switch>
        )
    }
}
