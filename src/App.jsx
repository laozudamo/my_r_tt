import './App.scss'
import 'antd/dist/antd.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Layout from '@/layout'
import Resource from '@/views/resource'
import Port from '@/views/port'
import TestCase from '@/views/testCase'
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

// 实例
import Dosigmp from '@/views/testCase/DDos/DosIgmp'
import Dosicmp from '@/views/testCase/DDos/DosIcmp'
import DosIp from '@/views/testCase/DDos/DosIp'
import DosTcp from '@/views/testCase/DDos/DosTcp'
import DosUdp from '@/views/testCase/DDos/DosUdp'
import DosArp from '@/views/testCase/DDos/DosArp'
import Fuzzy from '@/views/testCase/Fuzzy'
// import Dosicmp from '@/views/testCase/DDos/DosIcmp'

// 模版
import NetSource from '@/views/resource/netSource'
import WebAttack from '@/views/resource/webAttack'

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
            {/* 
              实例
            */}
            <Route path="testCase" element={<TestCase />}>
              <Route path="igmp" index element={<Dosigmp />} />
              <Route path="icmp" index element={<Dosicmp />} />
              <Route path="tcp" index element={<DosTcp />} />
              <Route path="ip" index element={<DosIp />} />
              <Route path="udp" index element={<DosUdp />} />
              <Route path="arp" index element={<DosArp />} />
              <Route path="fuzzy" index element={<Fuzzy />} />
            </Route>
            
            <Route path="report" element={<Report />} />

            <Route path="system" element={<System />}>
              <Route path="logInfo" index element={<LogInfo />} />
              <Route path="interface" element={<Interface />} />
              <Route path="systemInfo" element={<SystemInfo />} />
              <Route path="userAdmin" element={<UserAdmin />} />
              <Route path="portSetting" element={<PortSetting />} />
            </Route>

            <Route path="resource" element={<Resource />}>
              <Route path="netSource" index element={<NetSource />} />
              <Route path="webAttack" element={<WebAttack />} />
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
