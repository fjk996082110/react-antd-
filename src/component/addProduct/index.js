import React,{useEffect,useState,useRef} from 'react'
import {Card,Button,Form,Input,message,Modal} from 'antd'
import {ArrowLeftOutlined,CloseCircleOutlined} from '@ant-design/icons';
import axios from '../../axios/diyAxios'
import RichText from './richText'
import PictureWall from './pictureWall'

const AddProduct = (props) => {
  const [isUpdate,setIsUpdate] = useState(false)
  const [id,setId] = useState('')
  const [delConfirm,setDelConfirm] = useState(false)

  const elRef = useRef('')
  const elRefImg = useRef('')
  const elRefForm = useRef('')

  useEffect(() => {
    if(props.match.params && !!props.match.params.id){
      const _id = props.match.params.id
      axios.get('/productManage/getProductById',{params:{_id:_id}}).then((res) => {
        const {productInfo} = res.data
        const info = {
          name: productInfo.name,
          desc: productInfo.desc,
          price: productInfo.price
        }
        setIsUpdate(true)
        setId(productInfo._id)
        elRef.current.setRichText(productInfo.detail)
        elRefImg.current.setImgs(productInfo.img)
        elRefForm.current.setFieldsValue(info)
      })
    }
  },[])

  const onFinish = (e) => {
    let value = e
    value.detail = elRef.current.getRichText()
    value.img = elRefImg.current.getImgNames()
    if(isUpdate){
      value._id = id
      axios.post('/productManage/updateProduct',{productInfo:value}).then((res) => {
        if(res.data.msg.indexOf('更新成功') != -1){
          message.success('更新成功')
          props.history.push('/home/product')
        }
      })
    }else{
      axios.post('/productManage/add',{productInfo:value}).then((res) => {
        if(res.data.data && !!res.data.data.productInfo){
          message.success('新增成功')
          props.history.push('/home/product')
        }else{
          message.error(res.data.msg)
        }
      })
    }
  }

  const deleteById = () => {
    axios.post('/productManage/deleteProduct',{_id:id}).then((res) => {
      if(res.data.msg.indexOf('删除成功') != -1){
        message.success('删除成功')
        props.history.push('/home/product')
      }
    })
  }
  
  const deleteConfirm = () => {
    setDelConfirm(true)
  }

  const handleOk = () => {
    setDelConfirm(false)
    deleteById()
  }

  const handleCancel = () => {
    setDelConfirm(false)
  }

  return <Card title={
    <div>
      <Button onClick={()=>{props.history.goBack()}} type="link">
        <ArrowLeftOutlined/>返回
      </Button>
      {
        isUpdate?<Button onClick={()=>{deleteConfirm()}} type="link" style={{marginLeft:'10px'}}>
        <CloseCircleOutlined />删除
      </Button>:''
      }
    </div>
  }>
    <Modal title="确认" visible={delConfirm} onOk={handleOk} onCancel={handleCancel} okText='确认' cancelText='取消'>
      <p>确定要删除么</p>
    </Modal>
    <Form onFinish={onFinish} ref={elRefForm}>
      <Form.Item
        name="name"
        rules={[{required:true,message:'菜品名称不能为空'}]}
        label="菜品名称"
        wrapperCol={{span:10}}
      >
        <Input placeholder="输入菜品名称"/>
      </Form.Item>
      <Form.Item
        name="desc"
        rules={[{required:true,message:'描述不能为空'}]}
        label="菜品描述"
        wrapperCol={{span:10}}
      >
        <Input placeholder="输入菜品描述"/>
      </Form.Item>
      <Form.Item
        name="price"
        rules={[{required:true,message:'营养价值不能为空'}]}
        label="营养价值"
        wrapperCol={{span:10}}
      >
        <Input
          addonAfter="克"
          addonBefore="g"
          type="number"
          placeholder="输入菜品营养价值"
        />
      </Form.Item>
      <Form.Item
        style={{marginLeft:'10px'}}
        label="菜品图片"
        wrapperCol={{span:10}}
      >
        <PictureWall ref={elRefImg} />
      </Form.Item>
      <Form.Item
        style={{marginLeft:'10px'}}
        label="菜品详情"
        wrapperCol={{span:20}}
      >
        <RichText ref={elRef} />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" type="primary">提交</Button>
      </Form.Item>
    </Form>
  </Card>
}

export default AddProduct