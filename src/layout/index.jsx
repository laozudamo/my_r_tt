import {
  UserOutlined,
  SettingOutlined,
  ControlOutlined,
  FullscreenOutlined,
  LogoutOutlined,
  ProfileOutlined,
  DesktopOutlined,
  OrderedListOutlined,
  HddOutlined,
  FileTextOutlined
} from '@ant-design/icons'

import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { Menu, Divider, Dropdown, Space } from 'antd'
import React, { useState, useEffect } from 'react'

import { logout } from '@/api/user'

function Logout() {
  return new Promise(async (resolve, reject) => {
    try {
      let res = await logout()
      resolve(res)
    } catch (error) {
      console.error(error)
      reject(error)
    }
  })
}


localStorage.setItem('pathName', 'logInfo')

export default function layout() {
  const [current, setCurrent] = useState('servce')
  const navigate = useNavigate()
  const location = useLocation()

  const [path, setPath] = useState('logInfo')

  const onClick = (e) => {
    navigate(e.key)
    setCurrent(e.key)
  }
  useEffect(() => {
    setCurrent(location.pathname)
  }, [location])

  const items = [
    {
      label: '服务',
      key: '/',
      icon: <ControlOutlined />,
    },
    {
      label: '实例',
      key: '/example',
      icon: <HddOutlined />,
    },
    {
      label: '任务',
      key: '/task',
      icon: <OrderedListOutlined />,
    },
    {
      label: '监控',
      key: '/port',
      icon: <DesktopOutlined />,
    },
    {
      label: '报告',
      key: '/report',
      icon: <FileTextOutlined />
    },
    {
      label: '模版',
      key: '/resource/netSource',
      icon: <ProfileOutlined />,
    },
    {
      label: '设置',
      key: `/system/${path}`,
      icon: <SettingOutlined />,
    },
  ]

  // 退出登录
  const logout = async () => {
    await Logout()
    navigate('/login')
    // console.log('logged out')
  }

  const menu = (
    <Menu
      onClick={logout}
      items={[
        {
          key: 'logout',
          label: '退出登录',
          icon: <LogoutOutlined />,
        },
      ]}></Menu>
  )

  return (
    <div className="page">
      <header className="hearder">
        <Menu
          style={{}}
          className="hearder-menu"
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        <div className="heard-user">
          <div style={{ paddingLeft: '10px' }}>
            <FullscreenOutlined />
          </div>

          <div>
            <Divider type="vertical" />
          </div>

          <Dropdown overlay={menu}>
            <Space>
              <div style={{ paddingLeft: '10px' }}>
                <UserOutlined />
              </div>
              <div style={{ paddingLeft: '10px' }}>张三</div>
            </Space>
          </Dropdown>
        </div>
      </header>

      <Outlet />
    </div>
  )
}
