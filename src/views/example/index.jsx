import './index.scss'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Menu, Image } from 'antd'
import React, { useState } from 'react'
import img from '@/assets/images/test.png'

const items = [
  {
    key: '1',
    label: '4-7层测试',
    icon: <MenuFoldOutlined />,
    children: [
      {
        key: 'RFC3511',
        label: 'RFC3511',
        children: [
          {
            key: 'HTTPS',
            label: 'HTTPS',
            icon: <MenuFoldOutlined />,
          },
          {
            key: 'HTTP',
            label: 'HTTP',
            icon: <MenuFoldOutlined />,
          },
        ],
      },
      {
        key: '协议仿真',
        label: '协议仿真',
        children: [
          {
            key: 'IPsec',
            label: 'IPsec',
          },
          {
            key: 'SSL',
            label: 'SSL',
          },
          {
            key: 'SMTP',
            label: 'SMTP',
          },
          {
            key: 'FMTP',
            label: 'FMTP',
          },
          {
            key: 'POP3',
            label: 'POP3',
          },
          {
            key: 'RADIUS',
            label: 'RADIUS',
          },
          {
            key: '802.1.x',
            label: '802.1.x',
          },
          {
            key: 'DNS',
            label: 'DNS',
          },
          {
            key: 'NAC',
            label: 'NAC',
          },
          {
            key: '协议扩展',
            label: '协议扩展',
          },
        ],
      },
    ],
  },
  {
    key: '网络安全',
    label: '网络安全',
    icon: <MenuFoldOutlined />,
    children: [
      {
        key: 'DDOS攻击',
        label: 'DDOS攻击',
        children: [
          {
            key: 'IGMP',
            label: 'IGMP',
          },
          {
            key: 'ICMP',
            label: 'ICMP',
          },
          {
            key: 'IP',
            label: 'IP',
          },
          {
            key: 'UDP',
            label: 'UDP',
          },
          {
            key: 'TCP',
            label: 'TCP',
          },
          {
            key: 'ARP',
            label: 'ARP',
          },
        ],
      },

      {
        key: '病毒攻击',
        label: '病毒攻击',
        children: [
          {
            key: '后门攻击',
            label: '后门攻击',
          },
          {
            key: '蠕虫攻击',
            label: '蠕虫攻击',
          },
        ],
      },
      {
        key: '模糊攻击',
        label: '模糊攻击',
        children: [
          {
            key: 'http',
            label: 'http',
          },
          {
            key: 'FTP',
            label: 'FTP',
          },
          {
            key: '21',
            label: 'DNS',
          },
          {
            key: '12',
            label: 'SMTP',
          },
          {
            key: '19',
            label: 'POP3',
          },
        ],
      },
    ],
  },
  {
    key: '场景复现',
    label: '场景复现',
    icon: <MenuFoldOutlined />,
  },
  // {
  //   key: '2-3层测试',
  //   label: '2-3层测试',
  //   icon: <MenuFoldOutlined />,
  //   children: [
  //     {
  //       key: 'RFC2511',
  //       label: 'RFC2511',
  //     },
  //     {
  //       key: 'RFC2889',
  //       label: 'RFC2889',
  //     },
  //   ],
  // },
]

const Example = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }
  // let url = require("@/assets/images/test.png")
  return (
    <div className="main">
      <div>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}></Menu>
        {/* <Button type="primary" onClick={toggleCollapsed} className="col-btn">
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button> */}
      </div>
      <div style={{ width: '100%' }}>
        <Image width={1300} height={400} src={img}></Image>
      </div>
    </div>
  )
}

export default Example
