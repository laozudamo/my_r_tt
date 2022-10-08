import './index.scss'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button, Menu } from 'antd'
import React, { useState } from 'react'

const items = [
  {
    key: '1',
    label: '网络完全',
    icon: <MenuFoldOutlined />,
  },
  {
    key: '2',
    label: '网络完全',
    icon: <MenuFoldOutlined />,
  },
  {
    key: '3',
    label: '网络完全',
    icon: <MenuFoldOutlined />,
  },
]

const Example = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

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
      <div style={{ width: '100%' }}>121</div>
    </div>
  )
}

export default Example
