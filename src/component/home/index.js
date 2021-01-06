import React from 'react'
import {Image} from 'antd'
import stLogo from './img/st_logo.jpg'
import st from './img/st.jpg'
import './home.css'

const Home = (props)=>{

	return(
		<div className="sys-wrap">
			<div className="sys-header">
				<img src={stLogo} className="sys-logo" />
				<h3>Lunch Management System</h3>
			</div>
			<div className="sys-img">
				<Image src={st} />
			</div>
		</div>
	)
}

export default Home