import './App.scss'
import 'antd/dist/antd.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from '@/layout'
import Resource from '@/views/resource'
import Port from '@/views/port'
import Example from '@/views/example'
import System from '@/views/system'
import Servce from '@/views/servce'
import Task from '@/views/task'
import Report from '@/views/report'

// 系统
import Interface from '@/views/system/interface'
import LogInfo from './views/system/logInfo'
import SystemInfo from './views/system/systemInfo/systemInfo'
import UserAdmin from './views/system/userAdmin'
import PortSetting from './views/system/portSetting'

// 模版
import NetSource from '@/views/resource/netSource'

// 登录
import Login from '@/views/login/Login'

// 错误页面
import Notfound from '@/views/error/404'
import Forbbiden from '@/views/error/403'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Servce />} />
            <Route path="port" element={<Port />} />
            <Route path="task" element={<Task />} />
            <Route path="example" element={<Example />} />
            <Route path="report" element={<Report />} />

            <Route path="system" element={<System />}>
              <Route path="logInfo" index element={<LogInfo />} />
              <Route path="interface" element={<Interface />} />
              <Route path="systemInfo" element={<SystemInfo />} />
              <Route path="userAdmin" element={<UserAdmin />} />
              <Route path="portSetting" element={<PortSetting />} />
            </Route>

            <Route path="resource" element={<Resource />}>
              <Route index element={<NetSource />} />
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/403" element={<Forbbiden />} />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
