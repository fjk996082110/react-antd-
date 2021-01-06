import React,{Component} from 'react'
import {DatePicker,Space,ConfigProvider} from 'antd'
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default class ChooseAdd extends Component{

  state = {
    nowDate:''
  }
  
  onChange = (date, dateString) => {
    this.setState({
      nowDate: dateString
    })
  }

  render(){
    return <Space direction="vertical">
      <ConfigProvider locale={zhCN}>
        <DatePicker onChange={this.onChange} format='YYYY-MM-DD'  />
      </ConfigProvider>
    </Space> 
  }
}