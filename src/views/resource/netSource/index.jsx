import './netSource.scss'

import {
  Table,
  Button,
  Pagination,
  message,
  Modal,
  Form,
  Row,
  Col,
  Input,
  Checkbox,
  Collapse,
} from 'antd'

const { Panel } = Collapse

import {
  PlusOutlined,
  CloseOutlined,
  SyncOutlined,
  SnippetsOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { useEffect, useRef, useState } from 'react'
import tip from '@/components/Tips'

import { topuLists as list, topuDel } from '@/api/resource'

const nameRules = [
  {
    required: true,
    message: '请输入用户名',
    trigger: 'onChange',
  },
]

const clientPorts = [
  {
    label: 'Port0',
    value: 0,
  },
  {
    label: 'Port1',
    value: 1,
  },
  {
    label: 'Port2',
    value: 2,
  },
  {
    label: 'Port3',
    value: 3,
  },
]

const severPorts = [
  {
    label: 'Port0',
    value: 0,
  },
  {
    label: 'Port1',
    value: 1,
  },
  {
    label: 'Port2',
    value: 2,
  },
  {
    label: 'Port3',
    value: 3,
  },
]

export default function NetSource() {
  const [dataSource, setData] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [page_size, setPageSize] = useState(5)
  const [rowkeys, setRowKeys] = useState([])

  const params = {
    page,
    page_size,
  }

  const getList = async (params) => {
    try {
      const { data, count, page } = await list(params)
      setData(data)
      setCount(count)
      setPage(page)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteData = async (keys) => {
    const data = {
      pk: keys,
    }
    try {
      const res = await topuDel(data)
      tip(res)

      getList(params)
    } catch (error) {
      console.log(error)
    }
  }

  const pageChange = (page, size) => {
    const params = {
      page,
      page_size: size,
    }
    getList(params)
  }

  const edit = () => {}

  const copy = () => {}

  const deleteTopu = () => {
    if (rowkeys.length === 0) {
      message.error('请选择数据')
      return
    }
    deleteData(rowkeys)
  }

  const selectChange = (keys) => {
    setRowKeys(keys)
  }

  useEffect(() => {
    let params = {
      page,
      page_size,
    }
    getList(params)
  }, [])

  const columns = [
    {
      title: '数据ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'network_name',
      key: 'network_name',
    },

    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '修改时间',
      dataIndex: 'update_time',
      key: 'update_time',
    },
    {
      title: '复制',
      key: 'copy',
      render: () => (
        <Button type="primary" icon={<SnippetsOutlined />}>
          复制
        </Button>
      ),
    },
    {
      title: '编辑',
      key: 'edit',
      render: () => (
        <Button danger icon={<EditOutlined />}>
          编辑
        </Button>
      ),
    },
  ]

  const [isEdit, setisEdit] = useState(false)

  const [isModalVisible, setIsModalVisible] = useState(false)

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  // 表单重置
  const afterClose = () => {
    console.log('afterClose')
    // form.resetFields()
  }

  const change = (key) => {
    console.log(key)
  }


  const refs = [] 

  const ls =['allForm1', 'allForm2', 'allForm3'];

  const [form] = Form.useForm()

  const submitFrom = () => {
    console.log(refs)
    // form1
    //   .validateFields()
    //   .then((values) => {
    //     // if (isEdit) {
    //     //   console.log('编辑')
    //     //   return
    //     // }
    //     console.log('新增', values)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // form2
    //   .validateFields()
    //   .then((values) => {
    //     // if (isEdit) {
    //     //   console.log('编辑')
    //     //   return
    //     // }
    //     console.log('新增', values)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
    // clientFrom1
    //   .validateFields()
    //   .then((values) => {
    //     // if (isEdit) {
    //     //   console.log('编辑')
    //     //   return
    //     // }
    //     console.log('新增', values)
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }

  const [clientCfg, setClientCfg] = useState([])
  const [severCfg, setSeverCfg] = useState([])

  const clientCheckboxChange = (checkedValue) => {
    const data = checkedValue.map((item) => {
      const temData = {
        port: item,
        netmask: '12',
        gateway: '17.1.1.1',
        src_ip_range: '12121',
        vlan_id: '1',
        src_mac_range: '00:0c:29:dd:43:49/mac1-mac2',
        core_bind: '1',
        port_speed_detect_mode: 'Auto',
        port_speed: '1000',
        server_port: '0',
        dst_ip_range: '19',
        dst_mac_range: '00:0c:29:dd:43:49',
      }
      return temData
    })
    setClientCfg(data)
  }

  const severCheckboxChange = (checkedValue) => {
    const data = checkedValue.map((item) => {
      const temData = {
        port: item,
        netmask: '12',
        gateway: '17.1.1.1',
        src_ip_range: '12121',
        vlan_id: '1',
        src_mac_range: '00:0c:29:dd:43:49/mac1-mac2',
        core_bind: '1',
        port_speed_detect_mode: 'Auto',
        port_speed: '1000',
        server_port: '0',
        dst_ip_range: '19',
        dst_mac_range: '00:0c:29:dd:43:49',
      }
      return temData
    })
    setSeverCfg(data)
  }

  function He({ item }) {
    return (
      <Collapse key={item.port}>
        <Panel forceRender={true} key={item.port} header={`PORT-${item.port}`}>
          <Form
            key={item.port}
            ref={(r)=> { if(r) refs.push(r)}}
            name={item.port}
            layout="inline"
            initialValues={item}>
            <Form.Item
              name={'src_ip_range'}
              label={'源IP范围'}
              labelAlign="left">
              <Input />
            </Form.Item>
            <Form.Item name={'netmask'} label={'网络掩码'} labelAlign="left">
              <Input />
            </Form.Item>
            <Form.Item name={'gateway'} label={'网关'} labelAlign="left">
              <Input />
            </Form.Item>
            <Form.Item
              name={'vlan_id'}
              label={'虚拟主机子网VLAN'}
              labelAlign="left">
              <Input />
            </Form.Item>
            <Form.Item
              name={'src_mac_range'}
              label={'源mac范围'}
              labelAlign="left">
              <Input />
            </Form.Item>
            <Form.Item name={'core_bind'} label={'CPU核绑定'} labelAlign="left">
              <Input />
            </Form.Item>
            <Form.Item
              name={'port_speed_detect_mode'}
              label={'端口模式'}
              labelAlign="left">
              <Input />
            </Form.Item>
            <Form.Item name={'port_speed'} label={'端口速率'} labelAlign="left">
              <Input />
            </Form.Item>
            <Form.Item
              name={'server_port'}
              label={'服务端口'}
              labelAlign="left">
              <Input />
            </Form.Item>
            <Form.Item
              name={'dst_ip_range'}
              label={'目的IP范围'}
              labelAlign="left">
              <Input />
            </Form.Item>
            <Form.Item
              name={'dst_mac_range'}
              label={'目的IP地址'}
              labelAlign="left">
              <Input />
            </Form.Item>
          </Form>
        </Panel>
      </Collapse>
    )
  }

  const model = (
    <Modal
      onOk={submitFrom}
      className="the-Modal"
      size="small"
      cancelText={'取消'}
      okText={'确认'}
      afterClose={afterClose}
      title={isEdit ? '修改模版' : '新增模版'}
      open={isModalVisible}
      onCancel={handleCancel}
      destroyOnClose={true}>
      <Form form={form} name="name-form" layout="inline">
        <Form.Item
          name={'network_name'}
          label={'模版名称'}
          rules={nameRules}
          labelAlign="left">
          <Input style={{ width: '150px' }} />
        </Form.Item>
      </Form>
      <div className="model-content">
        <div className="model-client">
          <header className="title">客户端配置</header>
          <Checkbox.Group
            onChange={clientCheckboxChange}
            className="check-box"
            options={clientPorts}
          />

          <div className="flex-box">
            {clientCfg.map((item,index) => (
              <He key={index} item={item}></He>
            ))}
          </div>
        </div>
        <div className="model-serve">
          <header className="title">服务端配置</header>
          <Checkbox.Group
            onChange={severCheckboxChange}
            className="check-box"
            options={severPorts}
          />

          <div className="flex-box">
            {severCfg.map((item) => (
              <He item={item}></He>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  )

  return (
    <div className="main-content">
      <header className="btn-box">
        <div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}>
            新增模版
          </Button>
          <Button
            type="danger"
            className="del-btn"
            icon={<CloseOutlined />}
            onClick={deleteTopu}>
            删除模版
          </Button>
        </div>
        <Button
          type="ghost"
          className="del-btn"
          icon={<SyncOutlined />}
          onClick={() => getList(params)}>
          刷新
        </Button>
      </header>
      <Table
        rowSelection={{
          type: 'checkbox',
          onChange: (keys) => selectChange(keys),
        }}
        pagination={false}
        rowKey={(record) => record.id}
        dataSource={dataSource}
        columns={columns}
      />

      <Pagination
        onChange={pageChange}
        onShowSizeChange={(cur, size) => setPageSize(size)}
        defaultPageSize={page_size}
        current={page}
        showSizeChanger={true}
        total={count}
      />
      {model}
    </div>
  )
}
