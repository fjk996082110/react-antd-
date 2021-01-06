import React,{useState,useEffect} from 'react'
import {PageHeader} from 'antd'
import ev from '../../event/events'
import './header.less'

const HeaderIndex = (props) => {

    const [titleArr,setTitleArr] = useState();
    const [title,setTitle] = useState('home');

    useEffect(()=>{
        ev.addListener('change_Menu_Tab',(titleArr)=>{
            setTitleArr(titleArr);
            setTitle(titleArr[titleArr.length-1]);
        })
    })

    return (
        <div className="home_header">
            {/* <div className="home_header_top">Home</div> */}
            {/* <PageHeader
                className="site-page-header"
                title={title}
                subTitle="Where are you"
            /> */}
            {title}
        </div>
    )
}

export default HeaderIndex