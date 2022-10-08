import './logInfo.scss'

import { SyncOutlined } from '@ant-design/icons'
import { Table, Button, Pagination } from 'antd'
import { useEffect, useState } from 'react'
import { logInfo } from '@/api/devices'

const columns = [
  {
    title: '编号',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '姓名',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: '上次登录',
    dataIndex: 'last_login',
    key: 'last_login',
  },
  {
    title: '登录IP',
    dataIndex: 'login_ip',
    key: 'login_ip',
  },
  {
    title: '详情',
    dataIndex: 'details',
    key: 'details',
  },
]

export default function LogInfo() {
  const [dataSource, setTabelData] = useState([])

  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [page_size, setPageSize] = useState(10)

  function getLists() {
    const params = {
      page,
      page_size,
    }
    logInfo(params).then((res) => {
      const { data, count, page } = res
      setCount(count)
      setPage(page)
      setTabelData(data)
    })
  }

  function pageChange(p, v) {
    const params = {
      page: p,
      page_size: v,
    }
    logInfo(params).then((res) => {
      const { data, count, page } = res
      setCount(count)
      setPage(page)
      setTabelData(data)
    })
  }

  useEffect(() => {
    getLists()
  }, [])

  return (
    <div className="main-content">
      <div className="flash-btn-box">
        <Button type="primary" icon={<SyncOutlined />} onClick={getLists}>
          刷新
        </Button>
      </div>
      <Table
        pagination={false}
        rowKey={(record) => record.id}
        dataSource={dataSource}
        columns={columns}
      />
      <Pagination
        onChange={pageChange}
        pageSizeOptions={[10, 20, 50]}
        defaultCurrent={1}
        current={page}
        showSizeChanger={true}
        onShowSizeChange={(cur, size) => setPageSize(size)}
        total={count}
      />
    </div>
  )
}
