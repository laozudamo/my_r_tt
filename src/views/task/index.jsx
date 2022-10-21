// import { Image } from 'antd'
// import img from './test.png'

// function Task () {
//   return (
//     <div className='main-content'>
//       222
//     </div>
//   )
  
// }

// export default Task
import './index.scss'
import BtnBox from '@/components/BtnBox'
import { Table, Input, Button, Select, Modal, Form } from 'antd'
import { CopyOutlined, EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import {
  attackList,
  attackClass,
  attackdel,
  attackUpdate,
  attackCreate,
  attackDetail,
} from '@/api/webAttack.js'
import useCommonFn from '@/components/theFun'
const { Option } = Select
const { TextArea } = Input

function Task() {
  const {
    data,
    pagination,
    reflash,
    addData,
    deleteData,
    rowSelection,
    isModalOpen,
    handleOk,
    handleCancel,
    isEdit,
    editData,
    copyData,
    afterClose,
  } = useCommonFn(
    attackList,
    attackdel,
    attackCreate,
    attackUpdate,
    attackDetail,
    setFieldData
  )

  function setFieldData(data) {
    console.log('详细数据',data);
    const {
      attack_name,
      intrusion_class_id,
      content,
      details: { hit_str1, hit_str2, hit_str3, payload },
    } = data
    form.setFieldsValue({
      attack_name,
      intrusion_class_id,
      hit_str1,
      hit_str2,
      hit_str3,
      payload,
      content
    })
  }

  const rowKey = (record) => record.id

  const [optionList, setOptList] = useState([])

  function getOptionList(count) {
    return new Promise(async (resolve, reject) => {
      try {
        let p = {
          page: 1,
          page_size: count,
        }
        const { data } = await attackClass(p)
        resolve(data)
      } catch (error) {
        reject(error)
      }
    })
  }

  useEffect(() => {
    attackClass().then(async (res) => {
      const { count } = res
      const dataList = await getOptionList(count)
      setOptList(dataList)
    })
  }, [])

  const handleChange = (v) => {
    console.log(v)
  }

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '名称',
      dataIndex: 'attack_name',
      key: 'attack_name',
    },
    {
      title: '字符1',
      dataIndex: 'hit_str1',
      key: 'hit_str1',
    },
    {
      title: '字符2',
      dataIndex: 'hit_str2',
      key: 'hit_str2',
    },
    {
      title: '字符3',
      dataIndex: 'hit_str3',
      key: 'hit_str3',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '复制',
      render: () => (
        <Button
          onClick={() => copyData()}
          icon={<CopyOutlined />}
          type="primary"
          ghost>
          复制
        </Button>
      ),
    },
    {
      title: '编辑',
      render: (text, record) => (
        <Button
          onClick={() => editData(form, record)}
          icon={<EditOutlined />}
          ghost
          danger>
          编辑
        </Button>
      ),
    },
  ]

  const [form] = Form.useForm()

  return (
    <>
      <h3>WEB安全攻击列表</h3>
      {/* <div className="search-box">
        <div>
          <span>类型</span>
          <Select
            className="the-input"
            defaultValue="lucy"
            style={{
              width: 120,
            }}
            onChange={handleChange}>
            <Option value="jack">Jack</Option>
          </Select>
        </div>
        <Button>查询</Button>
      </div> */}

      <BtnBox
        addData={() => addData(form)}
        deleteData={() => deleteData()}
        reflash={() => reflash()}></BtnBox>
      <Table
        rowSelection={rowSelection}
        rowKey={rowKey}
        pagination={pagination}
        dataSource={data}
        columns={columns}
      />
      <Modal
        title={isEdit ? '编辑Web安全攻击' : '新增web安全攻击'}
        open={isModalOpen}
        onOk={() => handleOk(form)}
        onCancel={handleCancel}
        afterClose={afterClose}>
        <Form
          name="form"
          form={form}
          initialValues={{
            intrusion_class_id: '',
            attack_name: '',
            hit_str1: '',
            hit_str2: '',
            hit_str3: '',
            content: '',
          }}>
          <Form.Item label="类型" name="intrusion_class_id">
            <Select
              className="the-input"
              style={{
                width: 200,
              }}
              onChange={handleChange}>
              {optionList.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.classes_attack_name}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label="名称" name="attack_name">
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="描述" name="content">
            <Input  placeholder="请输入描述" />
          </Form.Item>
          <Form.Item label="命中字符1" name="hit_str1">
            <Input placeholder="请输入命中字符1" />
          </Form.Item>
          <Form.Item label="命中字符2" name="hit_str2">
            <Input placeholder="请输入命中字符2" />
          </Form.Item>
          <Form.Item label="命中字符3" name="hit_str3">
            <Input placeholder="请输入命中字符3" />
          </Form.Item>
          <Form.Item label="负载" name="payload">
            <TextArea rows={4} placeholder="请输入负载" />
          </Form.Item>
     
        </Form>
      </Modal>
    </>
  )
}

export default Task
