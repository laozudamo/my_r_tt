import React from 'react'
import { Table, Button, Select } from 'antd'
import {
  portList,
  portUnbind,
  cpuList,
  portBind,
  cpuBind,
} from '@/api/servce/servce.js'
import { useEffect, useState } from 'react'
import tip from '@/components/Tips'

function Servce() {
  const [dataSource, setDataSource] = useState([])

  const [options, setOptions] = useState([])
  const [curCpu, setCurCpu] = useState([])
  const [curPort, setCurPort] = useState('')

  async function getList() {
    try {
      const { data } = await portList()
      setDataSource(data)
      let tmpOptions = data.map((item) => {
        return item?.cpu_cores?.cpu_available
      })
      setOptions(tmpOptions)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getList()
  }, [])

  const onBlur = async () => {
    try {
      const fromData = new FormData()
      fromData.append('used_cpu', JSON.stringify(curCpu))
      fromData.append('port', Number(curPort))
      const res = await cpuBind(fromData)
      tip(res)
      getList()
    } catch (error) {
      console.log(error)
    }
  }

  const changeSelect = (port, cpu) => {
    setCurCpu(cpu)
    setCurPort(port)
  }

  const onSearch = (v) => {

  }

  const bindPort =async (port) => {
    try {
      const fromData = new FormData()
      fromData.append('port', Number(port))
      const res = await portBind(fromData)
      tip(res)
      getList()
    } catch (error) {
      console.log(error)
    }
  }

  const unbindPort = async (port) => {
    try {
      let params = {
        port: port,
      }
      const res = await portUnbind(params)
      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div style={{ margin: '20px' }}>
      {dataSource.map((item, index) => {
        return (
          <div key={item.cpu_node}>
            <h3>服务</h3>
            <Table
              dataSource={item.ports_info}
              columns={[
                {
                  title: '端口',
                  dataIndex: 'port',
                  key: 'port',
                },
                {
                  title: 'PCI地址',
                  dataIndex: 'pci_addr',
                  key: 'pci_addr',
                },
                {
                  title: '运行状态',
                  dataIndex: 'run_status',
                  key: 'run_status',
                  render: (row, text) => {
                    return <div>{row}</div>
                  },
                },
                {
                  title: '占用',
                  dataIndex: 'bind_user',
                  key: 'bind_user',
                },
                {
                  title: '操作',
                  dataIndex: 'bind',
                  key: 'bind',
                  render: (text, record) => {
                    return record.bind_user !== '-' ? (
                      <Button onClick={() => unbindPort(record.port)}>
                        解绑
                      </Button>
                    ) : (
                      <Button onClick={() => bindPort(record.port)}>
                        绑定
                      </Button>
                    )
                  },
                },
                {
                  title: 'CPU节点',
                  dataIndex: 'bind',
                  key: 'bind',
                  render: (text, record) => {
                    return (
                      <Select
                        disabled={record.bind_user === '-' ? true : false}
                        onBlur={onBlur}
                        mode="multiple"
                        onSearch={(v) => onSearch(v)}
                        style={{
                          width: '100%',
                          maxWidth: '400px',
                        }}
                        placeholder="Please select"
                        defaultValue={record.used_cpu}
                        onChange={(v) => changeSelect(record.port, v)}
                        options={options[index]}
                      />
                    )
                  },
                },
              ]}
              pagination={false}
            />
          </div>
        )
      })}
    </div>
  )
}

export default Servce
