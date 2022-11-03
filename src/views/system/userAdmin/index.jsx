
import './index.scss'
import { Space, Table, Button, Modal, Switch, Form, Input, Row, Col } from 'antd';
import PromissionCom from '@/components/PromissionCom'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react'
import { getAllUsers, userAdd, userDelete, userEdit, userDisable } from '@/api/userAdmin'

import tip from '@/components/Tips'

const formObj = [
  {
    name: 'username',
    label: '账户名',
    rules: [
      {
        required: true,
        message: '请输入用户名',
        trigger: "onChange"
      }
    ]
  },
  {
    name: 'password',
    label: '密码',
    rules: [
      {
        required: true,
        message: '请输入密码',
        trigger: "onBlur"
      },
      {
        min: 6,
        message: '密码最小长度为6位',
        trigger: "onChange"
      }
    ]
  }
]

function UserAdmin () {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [data, setData] = useState([])

  const showModal = () => {
    setIsModalVisible(true);
  };

  const getList = () => {
    getAllUsers().then(res => {
      const tmp = res.data.map(item => {
        return Object.assign({ key: item.id }, item)
      })
      setData(tmp)
    })
  }

  useEffect(() => {
    getList()
  }, [])

  const [isEdit, setisEdit] = useState(false);

  const [form] = Form.useForm();

  function change (status, id) {
    let data = {
      is_delete: !status,
      user_id: id
    }
    userDisable(data).then(res => {
      console.log(res)
      tip(res)
    })
  }

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const editUser = (row) => {
    setIsModalVisible(true);
    setisEdit(true);

    form.setFieldsValue({
      username: row.username,
      password: '',
    })
    setUserId(row.id)
  }

  const deleteUser = (row) => {
    const params = {
      user_id: row.id
    }
    userDelete(params).then(res => {
      tip(res)
      getList()
    })
  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: "角色",
      dataIndex: 'role',
      key: 'role'
    },
    {
      title: "上次登录",
      dataIndex: 'update_time',
      key: 'update_time'
    },

    {
      title: "账户状态",
      dataIndex: 'on_line',
      key: 'on_line',
      render: (text, record, index) => (
        record.on_line ? <span style={{ color: "green" }}>在线</span> : <span style={{ color: "red" }}>离线</span>
      )
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button shape="circle" type='danger' icon={<DeleteOutlined style={{ color: '#fff' }} onClick={() => deleteUser(record)} />} />
          <Button shape="circle" icon={<EditOutlined style={{ color: '#08c' }} />} onClick={() => editUser(record)} />
          <Switch checkedChildren="激活" unCheckedChildren="禁用" defaultChecked={!record.is_delete} onChange={(check) => change(check, record.id)} />
        </Space>
      ),
    },
  ];

  // 表单重置
  const afterClose = () => {
    form.resetFields()
    setUserId('')
  }

  const [defaultVal] = useState({
    username: "",
    password: ""
  })


  function handleAdd (values) {
    const params = Object.assign(values, { role: "1" })
    userAdd(params).then(res => {
      tip(res)
      getList()
    })
    handleOk()
  }

  const [userId, setUserId] = useState('')

  function handleEdit (values) {
    const params = {
      password: values.password,
      user_id: userId,
    }
    userEdit(params).then(res => {
      tip(res)
      getList()
    })
    handleOk()
  }

  const addUser = () => {
    setisEdit(false)
    showModal()
  }

  const submitFrom = () => {
    form.validateFields().then(values => {
      if (isEdit) {
        handleEdit(values)
        return
      }
      handleAdd(values)
    }).catch(err => {
      console.log(err)
    })
  }

  const model = <Modal onOk={submitFrom} className='the-Modal' size="small" cancelText={"取消"} okText={"确认"} afterClose={afterClose} title={isEdit ? '修改' : '新增'} open={isModalVisible} onCancel={handleCancel} destroyOnClose={true} >
    <Form
      form={form}
      layout="inline"
      initialValues={defaultVal}
    >
      <Row >
        <Col span={22}>
          {formObj.map(item => <Form.Item
            key={item.name}
            name={item.name}
            label={item.label}
            rules={item.rules}
            labelAlign="left"
          >
            <Input disabled={isEdit && item.name === 'username' ? true : false} />
          </Form.Item>)}
        </ Col>
      </Row>
    </Form>
  </Modal>

  return (
    <div className='main-content'>
      <header className='the-header'>
        <div className='title'>用户管理</div>
        <PromissionCom>
          <Button icon={<PlusOutlined />} type="text" onClick={addUser}>
            添加用户
          </Button>
        </PromissionCom>
      </header>
      <Table columns={columns} dataSource={data} bordered size='small' pagination={false} />
      {model}

    </div>
  )
}


export default UserAdmin;