import './index.scss'
import { DeploymentUnitOutlined  } from '@ant-design/icons'
import { Button, Menu } from 'antd'
import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'

const items = [
  {
    key: 'netSource',
    label: '网络拓扑模版',
    icon: <DeploymentUnitOutlined />
  },
]

const Resource = () => {

  return (
    <div className="main">
      <div>
        <Menu
          defaultSelectedKeys={['netSource']}
          mode="inline"
          theme="light"
          // inlineCollapsed={collapsed}
          items={items}></Menu>
      </div>
      <div className='right-content'>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Resource
