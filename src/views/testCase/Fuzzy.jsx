import BtnBox from '@/components/BtnBox'
import { Table, Button, Select, Modal, Form, Input, InputNumber } from 'antd'
import {
  CopyOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  CaretRightFilled,
} from '@ant-design/icons'
import { list, create, update, del } from '@/api/fuzzy'

import useCommonFn from '@/components/theFun'

import { useTopo } from '@/components/topo.js'
import { useFuzzy } from '@/utils/fuzzyList.js'

// const { list, create, update, del, copy, detail } = DDosType('arp')
const { Option } = Select

const theOptions = [
  {
    label: 'ARP_REQUEST_FLOOD',
    value: 'ARP_REQUEST_FLOOD',
  },

  {
    label: 'ARP_REPLY_FLOOD',
    value: 'ARP_REPLY_FLOOD',
  },
  {
    label: 'ARP_GRAMR_FLOOD',
    value: 'ARP_GRAMR_FLOOD',
  },
]

function DosIcmp() {
  const { topoOptions } = useTopo()
  const { fuzzyOptions } = useFuzzy()
  // const ishandleAdd = true

  const allProps = {
    list,
    del,
    create,
    update,
    setFieldData,
    setAddForm,
    ishandleAdd:true,
  }
  
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
  } = useCommonFn(allProps)

  function setAddForm(value) {
    const { use_case_name, total_time, network_config_id, dst_port, fuzz_id, index_end } =
      value
    const addForm = {
      use_case_name,
      total_time,
      network_config_id,
      config: {
        dst_port,
        fuzz_id,
        index_end,
      },
    }
    return addForm
    // const formData = new FormData()
    // formData.append('form',JSON.stringify(addForm))
    // return formData
  }

  function setFieldData(data) {
    // const { net_cfg, stream_mode, use_case_name, stream_params, id } = data
    // form.setFieldsValue({
    //   id,
    //   net_cfg,
    //   stream_mode,
    //   use_case_name,
    //   stream_params,
    // })
  }

  const rowKey = (record) => record.id

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
          danger></Button>
      ),
    },

    {
      title: '复制',
      render: (text, record) => (
        <Button
          onClick={() => copyData(record.id)}
          icon={<CopyOutlined />}
          type="primary"
          ghost></Button>
      ),
    },
    // {
    //   title: '详情',
    //   render: () => (
    //     <Button icon={<CopyOutlined />} type="primary" ghost>
    //       详情
    //     </Button>
    //   ),
    // },
    {
      title: '运行',
      render: () => (
        <Button icon={<CaretRightFilled />} type="primary" ghost></Button>
      ),
    },
  ]

  const [form] = Form.useForm()

  return (
    <>
      <h3>模糊攻击实例</h3>
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
        width="500px"
        title={isEdit ? '编辑模糊攻击' : '新增模糊攻击'}
        open={isModalOpen}
        onOk={() => handleOk(form)}
        onCancel={handleCancel}
        afterClose={afterClose}>
        <Form name="form" form={form} initialValues={{ }}>
          <Form.Item label="名称" name="use_case_name">
            <Input
              placeholder="请输入名称"
              style={{
                width: '300px',
              }}
            />
          </Form.Item>

          <Form.Item label="网络拓扑" name="network_config_id">
            <Select
              style={{
                width: '300px',
              }}>
              {topoOptions.map((item) => {
                return (
                  <Option key={item.label} value={item.value}>
                    {item.label}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label="测试时间" name="total_time">
            <InputNumber
              min={1}
              placeholder="请输入时间"
              style={{
                width: '300px',
              }}
            />
          </Form.Item>
          <Form.Item label="模糊模版" name="fuzz_id">
            <Select
              style={{
                width: '300px',
              }}>
              {fuzzyOptions.map((item) => {
                return (
                  <Option key={item.label} value={item.value}>
                    {item.label}
                  </Option>
                )
              })}
            </Select>
          </Form.Item>
          <Form.Item label="目标端口" name="dst_port">
            <InputNumber
              min={0}
              placeholder="请输入目标端口"
              style={{
                width: '300px',
              }}
            />
          </Form.Item>
          <Form.Item label="发包数量" name="index_end">
            <InputNumber
              min={1}
              placeholder="请输入发包数量"
              style={{
                width: '300px',
              }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}

export default DosIcmp
