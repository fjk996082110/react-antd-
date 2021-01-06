import React,{useState,useEffect,useRef} from 'react'
import {Card,Button,Table,message,Image,Space,ConfigProvider,DatePicker} from 'antd'
import {SearchOutlined,PlusCircleOutlined,RollbackOutlined} from '@ant-design/icons'
import zhCN from 'antd/lib/locale/zh_CN';
import moment from 'moment';
import 'moment/locale/zh-cn';
import axios from '../../axios/diyAxios'
import {ServerIP} from '../../config'
moment.locale('zh-cn');

const ClassificationIndex = (props) => {
	const [productData,setProductData] = useState()
	const [isLoading,setIsLoading] = useState(false)
	const [dateValue,setDateValue] = useState('')

	useEffect(() => {
		getFoodList(moment().format('YYYY-MM-DD'))
		setDateValue(moment().format('YYYY-MM-DD'))
	},[])

	const deleteFood = (id) => {
		console.log(id,dateValue)
		axios.post('/foodMenu/deleteFood',{foodID:id,time:dateValue}).then((res) => {
			let arr = imgSrcClear(res.data.data)
			location.reload()
			// setProductData(arr)
		})
	}

	const imgSrcClear = (arr) => {
		arr.map((item) => {
			item.img = `${ServerIP}/upload/${item.img}`
		})
		return arr
	}

	const dateChange = (date, dateString) => {
		setDateValue(dateString)
		getFoodList(dateString)
	}

	const getFoodList = (date) => {
		axios.get('/foodMenu/getFoodList',{params:{foodMenuTime:date}}).then((res) => {
			const {foodList} = res.data
			if(!!foodList){
				// foodList.map((item) => {
				// 	item.img = `${ServerIP}/upload/${item.img}`
				// })
				let foodList1 = imgSrcClear(foodList)
				setProductData(foodList1)
			}else{
				message.warning('该日期未设置菜品')
				return false
			}
		})
	}

	const columns = [
		{
			title: '名称',
			dataIndex: 'name',
			key: 'name',
			width:'30%'
		},
		{
			title: '图片',
			dataIndex: 'img',
			key: 'img',
			width:'30%',
			render:(record)=>(<Image src={record} />)
		},
		{
			title:'操作',
			dataIndex: '_id',
			key: 'caozuo',
			align:'center',
			render:(id)=> (
				<div>
					<Button onClick={() => { deleteFood(id) }} type="link">删除</Button>
					<br/>
					<Button onClick={()=>{props.history.push(`/home/productUpdate/${id}`)}} type="link">修改</Button>
				</div>
			)
		}
	]

	return (
		<Card
			className="classification_wrap"
			title={
				<div>
					<Space direction="vertical">
						<ConfigProvider locale={zhCN}>
							<DatePicker onChange={dateChange} format='YYYY-MM-DD' defaultValue={moment(moment().format('YYYY-MM-DD'),'YYYY-MM-DD')} />
						</ConfigProvider>
					</Space>
				</div>
			}
		>
			<Table
				bordered
				dataSource={productData} 
				columns={columns} 
				rowKey="_id"
				loading={isLoading}
				// pagination={{ //分页器
				// 	pageSize:50, //每页展示几条数据
				// 	total:total, //数据总数
				// 	onChange:(number)=>{getProductList(number)},//页码改变的回调
				// 	current:current //当前在哪一页
				// }}
			/>
		</Card>
	)
}

export default ClassificationIndex