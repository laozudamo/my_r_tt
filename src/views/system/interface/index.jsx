
import './interface.scss'
import { useEffect, useState } from 'react'
import { getPortInfo, upDatePort } from '@/api/devices'
import { Descriptions, Button, Modal, Form, Input } from 'antd'
import tip from '@/components/Tips'

function portInfo () {
  return new Promise((resolve) => {
    getPortInfo().then((res) => {
      resolve(res)
    }).catch((err) => {
      console.log(err)
    })
  })
}

const ipReg = /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g
const networkMaskReg = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/
const getWayReg = /^(192\.168(\.(\d|([1-9]\d)|(1\d{2})|(2[0-4]\d)|(25[0-5]))){2})$/

export default function Interface () {

  const [msgInfo, setInfo] = useState([])

  const init = async () => {
    try {
      const res = await portInfo()
      const { data: { manage_info } } = res
      setInfo(manage_info)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    init()
  }, [])

  const [isModalVisible, setModalVisable] = useState(false)
  const [form] = Form.useForm()

  const handleOk = () => {
    console.log('ok')
    form.validateFields().then(async value => {
      const res = await upDatePort(value)
      tip(res)
      setModalVisable(false)
    }).catch(error => {
      console.log(error)
    });
  }

  const afterClose = () => {
    console.log('after close')
    // from.initialValue()
  }
  const openModal = () => {
    form.setFieldsValue({
      ip_addr: msgInfo[15]['IPADDR'],
      network_name: msgInfo[11].NAME,
      network_mask: msgInfo[16].NETMASK,
      gateway: msgInfo[17].GATEWAY
    })
    setModalVisable(true)

  }

  const modal = <Modal title="修改接口属性" visible={isModalVisible} onOk={handleOk} onCancel={() => setModalVisable(false)} afterClose={afterClose} width="370px" destroyOnClose={true}>
    <Form
      size='medium'
      requiredMark={false}
      form={form}

    >
      <Form.Item
        label="网卡名称"
        name="network_name"
      >
        <Input disabled />
      </Form.Item>
      <Form.Item
        label="IP地址"
        name="ip_addr"
        rules={[
          {
            required: true,
            message: '请输入IP地址',
          },
          {
            trigger: "onChange",
            message: '请正确输入IP地址',
            pattern: ipReg
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="子网掩码"
        name="network_mask"
        rules={[
          {
            required: true,
            message: '请输入子网掩码',
          },
          {
            trigger: "onChange",
            message: '请正确输入子网掩码',
            pattern: networkMaskReg
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="网关地址"
        name="gateway"
        rules={[
          {
            required: true,
            message: '请输入网关地址',
          },
          {
            trigger: "onChange",
            message: '请正确输入网关地址',
            pattern: getWayReg
          },
        ]}
      >
        <Input />
      </Form.Item>

    </Form>
  </Modal>

  return (
    <div className='main-content'>
      <Descriptions title="接口信息" layout="horizontal" bordered size='small'>
        {
          msgInfo.map(item => { return <Descriptions.Item key={Object.keys(item)[0]} label={Object.keys(item)}> {item[Object.keys(item)]} </Descriptions.Item> })
        }
      </Descriptions>
      <Button danger className='fix-btn' onClick={openModal}>
        修改接口属性
      </Button>

      {modal}
    </div>
  )
}
