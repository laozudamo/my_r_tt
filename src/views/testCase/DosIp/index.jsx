import './index.scss'
import BtnBox from '@/components/BtnBox'
import { Table, Input, Button, Select, Modal, Form } from 'antd'
import { CopyOutlined, EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { list, create, update, del } from '@/api/task.js'
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
  } = useCommonFn(list, create, update, del, setFieldData)

  function setFieldData(data) {
    console.log('详细数据', data)

    // form.setFieldsValue({})
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
    // attackClass().then(async (res) => {
    //   const { count } = res
    //   const dataList = await getOptionList(count)
    //   setOptList(dataList)
    // })
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
      dataIndex: 'fuzz_name',
      key: 'fuzz_name',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '开始时间',
      dataIndex: 'run_time',
      key: 'run_time',
    },
    {
      title: '运行状态',
      dataIndex: 'status',
      key: 'status',
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
    {
      title: '查看',
      render: () => (
        <Button icon={<CopyOutlined />} type="primary" ghost>
          查看
        </Button>
      ),
    },
    {
      title: '运行',
      render: () => (
        <Button icon={<CopyOutlined />} type="primary" ghost>
          运行
        </Button>
      ),
    },
    {
      title: '报告',
      render: () => (
        <>
          <Button icon={<CopyOutlined />} type="primary" ghost>
            下载
          </Button>
          <Button icon={<CopyOutlined />} type="primary" ghost>
            预览
          </Button>
        </>
      ),
    },
  ]

  const [form] = Form.useForm()

  return (
    <>
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
        title={isEdit ? '编辑任务' : '新增任务'}
        open={isModalOpen}
        onOk={() => handleOk(form)}
        onCancel={handleCancel}
        afterClose={afterClose}>
        <Form
          name="form_task"
          form={form}
          initialValues={{
         
          }}>
        
          <Form.Item label="名称" name="name">
            <Input placeholder="请输入名称" />
          </Form.Item>

          <Form.Item label="运行时间" name="run_time">
            <Input placeholder="请选择运行时间" />
          </Form.Item>
          <Form.Item label="实例类型" name="type">
            <Select
              className="the-input"
              style={{
                width: 200,
              }}
              onChange={handleChange}>
              {/* {optionList.map((item) => {
                return (
                  <Option key={item.id} value={item.id}>
                    {item.classes_attack_name}
                  </Option>
                )
              })} */}
              <Option key={1} value={2}></Option>
            </Select>
          </Form.Item>

          <Form.Item label="实例" name="hit_str2">
            <Input placeholder="请输入命中字符2" />
            <button>确认</button>
          </Form.Item>

          <Form.Item label="实例列表" name="use_case">
            <TextArea rows={4} placeholder="请输入负载" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default Task
