import './index.scss'
import { DeploymentUnitOutlined } from '@ant-design/icons'
import { Button, Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'

const items = [
  {
    key: 'netSource',
    label: '网络拓扑模版',
    icon: <DeploymentUnitOutlined />,
  },
  {
    key: 'webAttack',
    label: 'web安全攻击',
    icon: <DeploymentUnitOutlined />,
  },
]

function handPath(str) {
  return str.split('/').pop()
}
const Resource = () => {
  const { pathname } = useLocation()
  const [curRoute, setRoute] = useState('')
  const nav = useNavigate()

  const changeRoute = (v) => {
    setRoute(v.key)
    nav(v.key)
  }
  useEffect(() => {
    setRoute(handPath(pathname))
  }, [location])

  return (
    <div className="main">
      <div>
        <Menu
          onClick={changeRoute}
          selectedKeys={[curRoute]}
          mode="inline"
          theme="light"
          items={items}></Menu>
      </div>
      <div className="right-content">
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default Resource
