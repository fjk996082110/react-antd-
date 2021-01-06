import React,{useState,useEffect,useRef} from 'react'
import {Card,Button,Input,Table,message,Modal,Form} from 'antd'
import {SearchOutlined,PlusCircleOutlined,RollbackOutlined} from '@ant-design/icons'
import ChooseAdd from './chooseAdd'
import axios from '../../axios/diyAxios'
import './index.css'

const PAGE_SIZE = 15

const ProductIndex = (props) => {
	const [productData,setProductData] = useState([])
	const [isSearch,setIsSearch] = useState(false)
	const [keyWord,setKeyWord] = useState('')
	const [isLoading,setIsLoading] = useState(false)
	const [total,setTotal] = useState(1)
	const [current,setCurrent] = useState(1)
	const [canBack,setCanBack] = useState(false)
	const [showDateSelect,setShowDateSelect] = useState(false)
	const [id,setId] = useState('')

	const chooseRef = useRef('')

	useEffect(() => {
		getProductAll()
	},[])

	const columns = [
		{
			title: '名称',
			dataIndex: 'name',
			key: 'name',
			width:'16%'
		},
		{
			title:'简介',
			dataIndex:'desc',
			key:'desc',
			width:'16%'
		},
		{
			title:'营养价值',
			dataIndex:'price',
			key:'price',
			width:'16%'
		},
		{
			title:'介绍',
			dataIndex:'detail',
			key:'detail',
			width:'16%'
		},
		{
			title:'操作',
			dataIndex: '_id',
			key: 'caozuo',
			align:'center',
			render:(id)=> (
				<div>
					<Button onClick={() => { chooseFood(id) }} type="link">选入</Button>
					<br/>
					<Button onClick={()=>{props.history.push(`/home/productUpdate/${id}`)}} type="link">修改</Button>
				</div>
			)
		}
	]

	const getProductAll = () => {
		axios.get('/productManage/getProductAll').then((res) => {
			setProductData(res.data)
		})
	}

	const chooseFood = (id) => {
		setId(id)
		setShowDateSelect(true)
	}
	
	const getProductList = (index,isSearch) => {
		if(isSearch=='search'){
			if(!!keyWord){
				axios.get('/productManage/getProductByName',{params:{name:keyWord}}).then((res) => {
					if(!!res.data.productInfo){
						setProductData(res.data.productInfo)
					}else{
						message.warning('未找到该菜品')
						return false
					}
				})
			}else{
				message.error('请输入关键词')
				return false
			}
		}else{
			axios.get('/manage/product/list',{params:{pageNum:index,pageSize:PAGE_SIZE}}).then((res) => {
				setProductData(res.data.list)
				setTotal(res.data.total)
				setCurrent(index)
			})
		}
	}

	const onFinish = (e) => {
		const time = chooseRef.current.state.nowDate
		const foodList = {foodList:[id],time:time}
		axios.post('/foodMenu/addFoodToMenu',{foodList:foodList})
		.then((res) => {
			if(res.status==200){
				message.success('添加成功')
				setShowDateSelect(false)
			}else{
				message.error(res.data.msg)
				setShowDateSelect(false)
			}
		})
	}

	const onCancel = () => {
		setShowDateSelect(false)
	}

	return (
		<Card 
			className="product_wrap"
			title={
				<div>
					<Input onChange={(event)=>{setKeyWord(event.target.value)}} allowClear style={{width:'20%',marginLeft:'10px',marginRight:'10px'}}/>
					<Button onClick={()=>{setIsSearch(true);setCanBack(true);getProductList(1,'search')}} type="primary"><SearchOutlined/>搜索</Button>
					{
						canBack?
						<Button onClick={()=>{setCanBack(false);getProductAll()}} type="primary" style={{marginLeft:'15px'}}><RollbackOutlined/>返回全部</Button>
						:''
					}
				</div>
			}
			extra={
				<Button 
					onClick={()=>{props.history.push('/home/addProduct')}} 
					type="primary"
				>
						<PlusCircleOutlined/>添加菜品
				</Button>}
		>
				<Table
					bordered
					dataSource={productData} 
					columns={columns} 
					rowKey="_id"
					loading={isLoading}
					pagination={{ //分页器
						pageSize:PAGE_SIZE, //每页展示几条数据
						total:total, //数据总数
						onChange:(number)=>{getProductList(number)},//页码改变的回调
						current:current //当前在哪一页
					}}
				/>
			<Modal title="菜单日期" visible={showDateSelect} footer={[]} onCancel={onCancel}>
				<Form onFinish={onFinish} className='product-form'>
					<ChooseAdd ref={chooseRef} />
					<Form.Item>
						<Button htmlType="submit" type="primary" className='product-submit-btn'>提交</Button>
					</Form.Item>
				</Form>
      </Modal>
		</Card>
	)
}

export default ProductIndex