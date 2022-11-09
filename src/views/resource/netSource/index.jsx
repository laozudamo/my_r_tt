import './netSource.scss'

import {
  Table,
  Button,
  Pagination,
  message,
  Modal,
  Form,
  Input,
  Checkbox,
  Select,
  Tabs,
} from 'antd'

const { Option } = Select

import {
  PlusOutlined,
  CloseOutlined,
  SyncOutlined,
  SnippetsOutlined,
  EditOutlined,
} from '@ant-design/icons'
import React, { useEffect, useRef, useState } from 'react'
import tip from '@/components/Tips'

import { list, del, create, update } from '@/api/template/netcfg.js'

const nameRules = [
  {
    required: true,
    message: '请输入模版名称',
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

function getCfgData(dom) {
  const list = dom.map((item, i) => {
    return item.getFieldValue()
  })
  return list
}

function saveData(p) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await create(p)
      resolve(res)
    } catch (error) {
      console.log(error)
    }
  })
}

function editData(p) {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await update(p)
      resolve(res)
    } catch (error) {
      console.log(error)
    }
  })
}

export default function NetSource() {
  const [dataSource, setData] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [page_size, setPageSize] = useState(20)
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
      ids: keys,
    }
    try {
      const res = await del(data)
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
      render: (text, record) => (
        <Button danger icon={<EditOutlined />} onClick={() => edit(record)}>
          编辑
        </Button>
      ),
    },
  ]

  const [form] = Form.useForm()
  const clientRefs = []
  const serveRefs = []
  const [isEdit, setisEdit] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [clientChecklist, setClientChecklist] = useState([])
  const [serveCheckList, setServeChecklist] = useState([])

  const [id, setId] = useState(-1)

  const edit = (record) => {
    setisEdit(true)
    setIsModalVisible(true)
    const { network_name, server_config, client_config, id } = record
    form.setFieldValue('network_name', network_name)
    setId(id)
    setClientData(client_config)
    setServeData(server_config)
    const clientPorts = client_config.map((item) => item.port)
    const serverPorts = server_config.map((item) => item.port)

    setClientChecklist(clientPorts)
    setServeChecklist(serverPorts)
  }

  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const [clientData, setClientData] = useState([])
  const [serveData, setServeData] = useState([])
  // 表单重置

  const afterClose = () => {
    setClientData([])
    setServeData([])
    setClientChecklist([])
    setServeChecklist([])
    setisEdit(false)
    setId(-1)

    form.resetFields()
    let params = {
      page,
      page_size,
    }
    getList(params)
  }

  const submitFrom = async () => {
    try {
      const { network_name } = await form.validateFields()
      const client_config = Array.from(new Set([...getCfgData(clientRefs)]))
      const server_config = Array.from(new Set([...getCfgData(serveRefs)]))

      if (isEdit) {
        if (id === -1) return
        let params = {
          id: id,
          network_name,
          client_config,
          server_config,
        }

        const res = await editData(params)
        tip(res)
        setIsModalVisible(false)
      } else {
        let params = {
          network_name,
          client_config,
          server_config,
        }
        const res = await saveData(params)
        tip(res)
        setIsModalVisible(false)
      }
    } catch (err) {
      console.error(err)
    }
  }

  // 客户端

  const ClientItem = (props) => {
    const { item } = props
    const [disable, setDisable] = useState(false)
    useEffect(() => {
      if (item.port_speed_detect_mode === 'Auto') {
        setDisable(true)
      }
    }, [])
    const changeMode = (v) => {
      if (v === 'Auto') {
        setDisable(true)
      } else {
        setDisable(false)
      }
    }

    return (
      <Form
        ref={(r) => {
          if (r) clientRefs.push(r)
        }}
        key={item.port}
        name={item.port}
        layout="inline"
        initialValues={item}>
        <Form.Item name={'src_ip_range'} label={'源IP范围'} labelAlign="left">
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
        <Form.Item name={'src_mac_range'} label={'源mac范围'} labelAlign="left">
          <Input />
        </Form.Item>
        <Form.Item name={'core_bind'} label={'CPU核绑定'} labelAlign="left">
          <Input />
        </Form.Item>
        <Form.Item
          name={'port_speed_detect_mode'}
          label={'端口模式'}
          labelAlign="left">
          <Select onChange={changeMode}>
            <Option value="Auto">自动协商</Option>
            <Option value="Mmanual">手动</Option>
          </Select>
        </Form.Item>
        <Form.Item name={'port_speed'} label={'端口速率'} labelAlign="left">
          <Input disabled={disable} />
        </Form.Item>
        <Form.Item name={'server_port'} label={'服务端口'} labelAlign="left">
          <Select>
            {clientPorts.map((item) => (
              <Option key={item.value} value={item.value}>
                {'Port' + item.value}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name={'dst_ip_range'} label={'目的IP范围'} labelAlign="left">
          <Input />
        </Form.Item>
        <Form.Item
          name={'dst_mac_range'}
          label={'目的IP地址'}
          labelAlign="left">
          <Input />
        </Form.Item>
      </Form>
    )
  }

  const ServeItem = (props) => {
    const { item } = props

    const [disable, setDisable] = useState(false)
    useEffect(() => {
      if (item.port_speed_detect_mode === 'Auto') setDisable(true)
    }, [])
    const changeMode = (v) => {
      if (v === 'Auto') {
        setDisable(true)
      } else {
        setDisable(false)
      }
    }

    return (
      <Form
        ref={(r) => {
          if (r) serveRefs.push(r)
        }}
        key={item.port}
        name={item.port}
        layout="inline"
        initialValues={item}>
        <Form.Item name={'src_ip_range'} label={'源IP范围'} labelAlign="left">
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
        <Form.Item name={'src_mac_range'} label={'源mac范围'} labelAlign="left">
          <Input />
        </Form.Item>
        <Form.Item name={'core_bind'} label={'CPU核绑定'} labelAlign="left">
          <Input />
        </Form.Item>
        <Form.Item
          name={'port_speed_detect_mode'}
          label={'端口模式'}
          labelAlign="left">
          <Select onChange={changeMode}>
            <Option value="Auto">自动协商</Option>
            <Option value="Mmanual">手动</Option>
          </Select>
        </Form.Item>
        <Form.Item name={'port_speed'} label={'端口速率'} labelAlign="left">
          <Input disabled={disable} />
        </Form.Item>
      </Form>
    )
  }


  const clientCheckboxChange = (checkedValue) => {
    setClientChecklist(checkedValue)
    // 拿到之前的数据 重新赋予值
    const tmp = clientRefs.map((item) => {
      return item.getFieldValue()
    })

    const data = checkedValue.map((item, index) => {
      let hasPort = tmp.some((v, i) => v.port === item)
      let j = -1
      tmp.forEach((v, i) => {
        if (v.port === item) {
          j = i
        }
      })
      if (hasPort && j >= 0) {
        return tmp[j]
      }

      const temData = {
        port: item,
        netmask: '12',
        gateway: '17.1.1.1',
        src_ip_range: '21',
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

    setClientData(data)
  }

  // 服务端
  const severCheckboxChange = (checkedValue) => {
    setServeChecklist(checkedValue)

    const tmp = serveRefs.map((item) => {
      return item.getFieldValue()
    })
    const data = checkedValue.map((item, index) => {
      let hasPort = tmp.some((v, i) => v.port === item)

      let j = -1
      tmp.forEach((v, i) => {
        if (v.port === item) {
          j = i
        }
      })
      if (hasPort && j >= 0) {
        return tmp[j]
      }

      const temData = {
        port: item,
        src_ip_range: 'ip1-ip2范围/列表/单值',
        netmask: '16',
        gateway: '18.1.1.1',
        vlan_id: '1',
        src_mac_range: '00:0c:29:dd:43:50',
        core_bind: '0',
        port_speed_detect_mode: 'Auto',
        port_speed: '10000',
      }
      return temData
    })

    setServeData(data)
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
      <Form
        form={form}
        name="name-form"
        layout="inline"
        requiredMark={false}
        initialValues={{ network_name: '' }}>
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
            defaultValue={clientChecklist}
            onChange={clientCheckboxChange}
            className="check-box"
            options={clientPorts}
          />
          <div className="flex-box">
            <Tabs>
              {clientData.map((item, index) => {
                return (
                  <Tabs.TabPane
                    tab={`Port${item.port}`}
                    key={index}
                    forceRender={true}>
                    <ClientItem item={item}></ClientItem>
                  </Tabs.TabPane>
                )
              })}
            </Tabs>
          </div>
        </div>
        <div className="model-serve">
          <header className="title">服务端配置</header>
          <Checkbox.Group
            defaultValue={serveCheckList}
            onChange={severCheckboxChange}
            className="check-box"
            options={severPorts}
          />
          <div className="flex-box">
            <Tabs>
              {serveData.map((item, index) => {
                return (
                  <Tabs.TabPane
                    tab={`Port${item.port}`}
                    key={index}
                    forceRender={true}>
                    <ServeItem item={item}></ServeItem>
                  </Tabs.TabPane>
                )
              })}
            </Tabs>
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
