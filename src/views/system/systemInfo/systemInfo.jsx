
import './systemInfo.scss'
import { chassisSystemInfo, getCardInfo } from '@/api//setting/devices'
import { useEffect, useState } from 'react'
import { Card, Table } from 'antd';

const token = window.localStorage.getItem('token')

function cardInfo () {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await getCardInfo()
      resolve(data)
      console.log(data)
    } catch (error) {
      reject(error)
      console.log(error)
    }
  })
}

const cpuClumns = [
  {
    title: "cpu核心数",
    dataIndex: 'cpu_count',
  },
  {
    title: "cpu使用率",
    dataIndex: 'current_cpu_use',
  },
  {
    title: "空闲率",
    dataIndex: 'free_cpu_use',
  },
  {
    title: "系统使用率",
    dataIndex: 'system_cpu_use',
  },
];

let timer = null
let ws = null

const memoryClumns = [
  {
    title: "总内存",
    dataIndex: "memtotal",

  },
  {
    title: "剩余内存",
    dataIndex: "memfree"
  },
  {
    title: "使用内存百分比",
    dataIndex: "mempercent"
  },
  {
    title: "已使用内存",
    dataIndex: "memused"
  },
]

const serverColumns = [
  {
    title: "磁盘路径",
    dataIndex: "disk_path"
  },
  {
    title: "文件系统",
    dataIndex: "disk_file_system"
  },
  {
    title: "盘符类型",
    dataIndex: "disk_type"
  },
  {
    title: "磁盘已用大小",
    dataIndex: "disk_use"
  },
  {
    title: "磁盘可用大小",
    dataIndex: "disk_free"
  },
  {
    title: "磁盘总大小",
    dataIndex: "disk_total"
  },
  {
    title: "磁盘已用百分比",
    dataIndex: "disk_percent"
  },
];


const cardColumns = [
  {
    title: "端口",
    dataIndex: "index",
    render (h) {
      return 'Port' + h
    },
  },
  {
    title: "板卡类型",
    dataIndex: "driver"
  },
  {
    title: "速率",
    dataIndex: "supp_speeds"
  },
  {
    title: "PCI 地址",
    dataIndex: "pci_addr"
  },
];

// let ws = null
// let timer = null

function SystemInfo () {
  // const [ws, setWs] = useState(null)

  const [sysVersion, setSysVersion] = useState('')

  const [cpuData, setCpuData] = useState([])

  const [memoryDara, setMemoryData] = useState([])

  const [cardData, setCardData] = useState([])

  const [serverInfo, setSeverInfo] = useState([])

  async function getVersion () {
    try {
      const { data } = await chassisSystemInfo()
      let sysVersion = data[0].system_version
      setSysVersion(sysVersion)
    } catch (error) {
      console.log(error)
    }
  }

  function unConnect () {
    console.log('unConnect')
    if (ws !== null) {
      timer = setTimeout(() => {
        ws.close()
        ws.onclose = function (event) {
          console.log(event);
        };
      }, 5000)
    }
  }

  const connect = () => {
    if (ws && timer) {
      clearTimeout(timer)
      timer = null
      reconnect()
      return
    }
    connecting()
  }

  function reconnect () {
    timer = setTimeout(() => { // 没连接上会一直重连，设置延迟避免请求过多
      console.log('重连' + new Date())
      connecting()
    }, 3000)
  }

  function connecting () {
    console.log('连接')
    ws = new WebSocket('ws://192.168.0.231:9001/realtime/realtime')
    ws.onopen = function () {
      ws.send(token)
      ws.send(JSON.stringify({ system_info: 'system_info_on' }))
    }
    ws.onmessage = function (e) {
      const res = e.data
      const { data } = JSON.parse(res)
      const { cpu_info } = data[0]
      const { memory_info } = data[1]
      const { disk_status } = data[2]
      setCpuData([cpu_info])
      setMemoryData(memory_info)
      setSeverInfo(disk_status)
    }
  }

  function getCard () {
    cardInfo().then(data => {
      setCardData(data)
    }).catch(err => {
      console.log(err)
    })
  }


  useEffect(() => {
    getVersion()
    connect()
    getCard()
    return () => {
      unConnect()
    }
  }, [])


  const Cardport = ({ name, data }) => {
    return (
      <div>
        <div className="card-port-title">
          <span>插槽</span>
          <span style={{ paddingLeft: '15px' }}>{name}</span>
        </div>
        <Table size='small' dataSource={data} columns={cardColumns} pagination={false} rowKey={record => record.index} />
      </div>
    )
  }

  return (
    <div className='main-content'>
      <Card
        size='small'
        title="机箱系统版本"
      >
        {sysVersion}
      </Card>
      <div className='fsb' style={{ marginTop: '15px' }}>
        <Card
          size='small'
          title="CPU"
          style={{
            width: '48%',
          }}
        >
          <Table size='small' dataSource={cpuData} columns={cpuClumns} pagination={false} rowKey={record => record.cpu_count} />
        </Card>
        <Card
          size='small'
          title="内存"
          style={{
            width: '48%',
          }}
        >
          <Table size='small' dataSource={memoryDara} columns={memoryClumns} pagination={false} rowKey={record => record.memtotal} />
        </Card>
      </div>
      <Card
        size='small'
        title="服务器信息"
        style={{ marginTop: '15px' }}
      >
        <Table size='small' dataSource={serverInfo} columns={serverColumns} pagination={false} rowKey={v => v.disk_path} />
      </Card>

      <Card
        size='small'
        title="板卡"
        style={{ marginTop: '15px' }}
      >
        {cardData.map(item => { return <Cardport name={item.slot_name} key={item.slot_name} data={item.ports_info}></Cardport> })}
      </Card>
    </div>
  )
}

export default SystemInfo