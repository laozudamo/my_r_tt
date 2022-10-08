import './index.scss'
import { RobotOutlined,UserOutlined, ExceptionOutlined,NodeCollapseOutlined,DesktopOutlined,  ProfileOutlined, MenuUnfoldOutlined,MenuFoldOutlined  } from '@ant-design/icons'
import { Button, Menu } from 'antd'
import React, { useState, useEffect } from 'react'
import { Outlet, useNavigate, useLocation} from "react-router-dom"


const items = [
  {
    label: '系统',
    icon: <RobotOutlined />,
    children: [
      {
        key: 'logInfo',
        label: "日志信息",
        icon: <ExceptionOutlined />
      },
      {
        key: 'systemInfo',
        label: "系统详情",
        icon: <DesktopOutlined />
      },
      {
        key: 'interface',
        label: "接口详情",
        icon: <NodeCollapseOutlined />
      }
    ]
  },
  {
    label: '用户管理',
    key: 'userAdmin',
    icon: <UserOutlined />
  },
  {
    key: 'portSetting',
    label: '报告配置',
    icon: <ProfileOutlined />
  },
]

const System = () => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const nav = useNavigate()
  const location = useLocation()

  const [current, setCurrent] = useState('logInfo')

  function handPath(str: string) {
    return str.split('/').pop()
  }

  const changeRoute = (v: any) => {
    nav(`${v.key}`);
    setCurrent(handPath(v.key))
    localStorage.setItem('pathName', handPath(v.key))
  }

  
  useEffect(() => {
    let path = handPath(location.pathname)
    setCurrent(path)
    
  }, [location])

  return (
    <div className="main">
      <div>
        <Menu
          onClick={changeRoute}
          selectedKeys={[current]}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items} />
        {/* <Button type="primary" onClick={toggleCollapsed} className="col-btn">
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button> */}
      </div>

      <div style={{ width: '100%' }}>
        <Outlet></Outlet>
      </div>
    </div>
  )
}

export default System
