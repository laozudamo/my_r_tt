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

  const confirmBindCpu = async () => {
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

  const bindPort = async (port) => {
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
      tip(res)
      getList()
    } catch (error) {
      console.log(error)
    }
  }

  const rowKey = (record) => record.port

  return (
    <div style={{ margin: '20px' }}>
      {dataSource.map((item, index) => {
        return (
          <div key={index}>
            <h3>
              <span>插槽名称:{item.slot_name}</span>
              <span>CPU核:{item?.cpu_cores?.cpu_cores}</span>
            </h3>
            <Table
              rowKey={rowKey}
              dataSource={item.ports_info}
              columns={[
                {
                  title: '端口',
                  dataIndex: 'port',
                  key: 'port',
                  width: 60,
                },
                {
                  width: 300,
                  title: 'PCI地址',
                  dataIndex: 'pci_addr',
                  key: 'pci_addr',
                },
                {
                  width: 100,
                  title: '运行状态',
                  dataIndex: 'run_status',
                  key: 'run_status',
                  render: (row, text) => {
                    return <div>{row}</div>
                  },
                },
                {
                  width: 300,
                  title: '占用',
                  dataIndex: 'bind_user',
                  key: 'bind_user',
                },
                {
                  title: '操作',
                  width: 150,
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
                      <>
                        <Select
                          allowClear
                          disabled={record.bind_user === '-' ? true : false}
                          mode="multiple"
                          style={{
                            width: '650px',
                            // maxWidth: '400px',
                          }}
                          // value={record.used_cpu}
                          placeholder="Please select"
                          defaultValue={record.used_cpu}
                          onChange={(v) => changeSelect(record.port, v)}
                          options={options[index]}
                        />
                        <Button
                          disabled={record.bind_user === '-' ? true : false}
                          onClick={confirmBindCpu}>
                          确认
                        </Button>
                      </>
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
