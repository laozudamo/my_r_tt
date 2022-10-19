import './index.scss'
import BtnBox from '@/components/BtnBox'
import { Table, Input, Button } from 'antd'
import { CopyOutlined, EditOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { attackList } from '@/api/webAttack.js'
import useCommonFn from '@/components/theFun'
const columns = [
  {
    title: '名称',
    dataIndex: 'attack_name',
    key: 'attack_name',
  },
  {
    title: '复制',
    render: () => (
      <Button icon={<CopyOutlined />} type="primary" ghost>
        复制
      </Button>
    ),
  },
  {
    title: '编辑',
    render: () => (
      <Button icon={<EditOutlined />} ghost danger>
        编辑
      </Button>
    ),
  },
]

function WebAttack() {
  const { data,pagination, reflash, addData, deleteData } = useCommonFn(attackList)

  const [selectedRowKeys, setkeys] = useState([])

  const onSelectChange = (keys) => {
    setkeys(keys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  return (
    <>
      <h3>WEB安全攻击列表</h3>
      <div className="search-box">
        <div>
          <span>类型</span>
          <Input className="the-input" placeholder="Basic usage" />
        </div>
        <Button>查询</Button>
      </div>
      <BtnBox
        addData={() => addData()}
        deleteData={() => deleteData()}
        reflash={() => reflash()}></BtnBox>
      <Table
        rowSelection={rowSelection}
        pagination={pagination}
        dataSource={data}
        columns={columns}
      />
    </>
  )
}

export default WebAttack
