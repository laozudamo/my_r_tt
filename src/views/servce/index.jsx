import React from 'react'
import { Table, Button } from 'antd'

const columns = [
  {
    title: '端口',
    dataIndex: 'port',
    key: 'port',
  },
  {
    title: '端口状态',
    dataIndex: 'portStatus',
    key: 'portStatus',
  },
  {
    title: '速率',
    dataIndex: 'speed',
    key: 'speed',
  },
  {
    title: '占用',
    dataIndex: 'owner',
    key: 'owner',
  },
  {
    title: '绑定',
    key: 'bind',
    render: () =>  <Button>占用</Button>
  },
  {
    title: '解除绑定',
    key: 'unbind',
    render: () => <Button>解绑端口</Button>
  }
]

const dataSource = [
  {
    key: 1,
    port: 'Port1',
    portStatus: '在线',
    speed: 1000,
    owner: 'admin'
  },
  {
    key: 2,
    port: 'Port2',
    portStatus: '在线',
    speed: 1000,
    owner: 'admin'
  },
  {
    key: 3,
    port: 'Port3',
    portStatus: '在线',
    speed: 1000,
    owner: 'admin'
  },
  {
    key: 4,
    port: 'Port4',
    portStatus: '在线',
    speed: 1000,
    owner: 'admin'
  },
]
function Servce() {
  return (
    <div className="main-content">
      <h3>服务</h3>
      <Table dataSource={dataSource} columns={columns} pagination={false}/>
    </div>
  )
}
// class Servce extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = { date: new Date(), num: 1 }
//   }
//   componentDidMount() {
//     console.log("挂载");
//   }

//   componentWillUnmount() {
//     console.log("离开")
//   }

//   render() {

//     )
//   }
// }

export default Servce
