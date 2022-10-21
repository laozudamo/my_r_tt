import BtnBox from '@/components/BtnBox'
import { Table, Input, Button, Select, Modal, Form } from 'antd'
import { CopyOutlined, EditOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { DDosType } from '@/api/DDos'

import useCommonFn from '@/components/theFun'

const { list, create, update, del, copy, detail } = DDosType('igmp')
const { Option } = Select
const { TextArea } = Input

function DosIcmp() {
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
  } = useCommonFn(list, del, create, update, detail, setFieldData, copy)

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
      title: '实例名称',
      dataIndex: 'use_case_name',
      key: 'use_case_name',
    },
    {
      title: '创建者',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '协议类型',
      dataIndex: 'protocol_type',
      key: 'protocol_type',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
    },
    {
      title: '更新时间',
      dataIndex: 'update_time',
      key: 'update_time',
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
      title: '详情',
      render: () => (
        <Button icon={<CopyOutlined />} type="primary" ghost>
          详情
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
  ]

  const [form] = Form.useForm()

  return (
    <>
      <h3>IGMP实例列表</h3>
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
        <Form name="form_task" form={form} initialValues={{}}>
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

export default DosIcmp
