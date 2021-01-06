import React, {useState,useEffect} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {Link,NavLink} from 'react-router-dom'
import {Switch,Route,Redirect} from 'react-router-dom'
import Chart from '../chart'
import Product from '../product'
import Classification from '../classification'
import AddProduct from '../addProduct'
import Home from '../home'
import User from '../user'
import axios from '../../axios/diyAxios'
import {DesktopOutlined,UserOutlined,} from '@ant-design/icons';
import './menu.less'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const MenuIndex = (props)=>{
    const [menuList,setMenuList] = useState([]);
		const [collapsed,setCollapsed] = useState(false)
		const [breadcrumb,setBreadcrumb] = useState([])

    useEffect(()=>{
        axios.get('/getMenu').then((res)=>{
					const { data } = res.data;
					setMenuList(data);
        })
    },[]);

    const handleClick = (e)=>{
			let titleArr = []
			for (const key in menuList) {
				if (Object.hasOwnProperty.call(menuList, key)) {
					const ele = menuList[key]
					if(e.key == ele.id || e.keyPath[1] == ele.id){
						titleArr.push(ele.name)
					}
				}
			}
			setBreadcrumb(titleArr)
    };

    const onCollapse = collapsed => {
        console.log(collapsed);
        setCollapsed(collapsed)
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['-1']} mode="inline" onClick={handleClick}>
							{
								menuList && menuList.map((item,index) => {
									return item.children&&item.children.length>0?<SubMenu key={item.id} icon={<UserOutlined />} title={item.name}>
										{
											item.children.map((child) => {
												return child.path!=''? <Menu.Item key={child.id}>
													<Link to={child.path}>
														{child.name}
													</Link>
												</Menu.Item> : <Menu.Item key={child.id}>{child.name}</Menu.Item>
											})
										}
									</SubMenu>:item.isShow!=0?<Menu.Item key={item.id} icon={<DesktopOutlined />}>
										<Link to={item.path}>
											{item.name}
										</Link>
									</Menu.Item>:''
								})
							}
							</Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} />
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
								<Breadcrumb.Item>管理系统</Breadcrumb.Item>
								{
									breadcrumb.map((crumb) => {
										return <Breadcrumb.Item>{crumb}</Breadcrumb.Item>
									})
								}
              </Breadcrumb>
              <Switch>
									<Route path='/home/product' component={Product} />
									<Route path='/home/classification' component={Classification} />
									<Route path='/home/chart' component={Chart} />
									<Route path='/home/addProduct' component={AddProduct} />
									<Route path='/home/productUpdate/:id' component={AddProduct} />
									<Route path='/home/user' component={User} />
									<Route path='/home' component={Home} />
							</Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Lunch Management System</Footer>
          </Layout>
        </Layout>
      );
}

export default MenuIndex