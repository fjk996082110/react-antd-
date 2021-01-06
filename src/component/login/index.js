import React,{useEffect,useState} from 'react'
import {Form, Input, Button, Checkbox, message, Modal} from 'antd'
import axios from '../../axios/diyAxios'
import {createSaveUserInfo} from '../../redux/actions/login'
import store from "../../redux/store";
import './index.less'

const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
};
const tailLayout = {
    wrapperCol: { offset: 6, span: 16 },
};

const Login = (props)=>{
    const [userInfo,setUserInfo] = useState('');
    const [showModal,setShowModal] = useState(false);
    const onFinish = async(values) => {
        axios.post('/login',{username:values.username,password:values.password}).then((res)=>{
            if(res.data.token){
                message.success('登录成功');
                // setUserInfo(res.data.userInfo);
                // store.dispatch(createSaveUserInfo(res.data));
                props.history.push('/home');
            }else {
                message.error('登录失败');
            }
        }).catch((err)=>{
            message.warning('request fail');
        })
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    const handleOk=() => {
        setShowModal(false);
        props.history.push('/home');
    }

    const handleCancel=() => {
        setShowModal(false);
    }

    useEffect(()=>{
        let info = localStorage.getItem("userInfo");
        if(!!info){
            setShowModal(true);
        }
    },[])

    return (
        <div className="login_wrap">
            <span className="login_title">登录</span>
            <Form
                {...layout}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                    <Checkbox>记住我</Checkbox>
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        登录
                    </Button>
                </Form.Item>
            </Form>
            <Modal
                title="提示"
                visible={showModal}
                onOk={handleOk}
                okText="确定"
                onCancel={handleCancel}
                cancelText="取消"
            >
                是否快速登陆?
            </Modal>
        </div>
    )
}
// export default connect(
//     (state)=>({isLogin:state.userInfo.isLogin}),
//     {save:createSaveUserInfo}
// )(Login)

export default Login