import BtnBox from '@/components/BtnBox'
import {
  Table,
  Button,
  Select,
  Modal,
  Form,
  Radio,
  Input,
  Space,
  Tabs,
} from 'antd'
import {
  CopyOutlined,
  EditOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  CaretRightFilled,
} from '@ant-design/icons'
import { DDosType } from '@/api/DDos'
import useCommonFn from '@/components/theFun'
import { useTopo } from '@/components/topo.js'
const { Option } = Select
import { useState } from 'react'

function DosIcmp(props) {
  const { theOptions, type } = props
  const TheStr = type.toUpperCase()
  const { list, create, update, del, copy, detail } = DDosType(type)
  const { topoOptions } = useTopo()
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
  } = useCommonFn({
    list,
    del,
    create,
    update,
    detail,
    copy,
    setFieldData,
  })

  function setFieldData(data) {
    const { net_cfg, stream_mode, use_case_name, stream_params, id } = data
    form.setFieldsValue({
      id,
      net_cfg,
      stream_mode,
      use_case_name,
      stream_params,
    })
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
          danger
        />
      ),
    },

    {
      title: '复制',
      render: (text, record) => (
        <Button
          onClick={() => copyData(record.id)}
          icon={<CopyOutlined />}
          type="primary"
          ghost
        />
      ),
    },
    {
      title: '运行',
      render: () => <Button icon={<CaretRightFilled />} type="primary" ghost />,
    },
  ]

  let attackList = []
  const selectAttack = (v) => {
    attackList = v
  }

  const [current, setCurrent] = useState(0)
  const next = () => {
    setCurrent(current + 1)
  }
  const prev = () => {
    setCurrent(current - 1)
  }

  const [form] = Form.useForm()

  function TheForm() {
    return (
      <Form name="form" form={form} initialValues={{}}>
        <Form.Item label="名称" name="use_case_name">
          <Input
            placeholder="请输入名称"
            style={{
              width: '300px',
            }}
          />
        </Form.Item>

        <Form.Item label="网络拓扑" name="net_cfg">
          <Select
            style={{
              width: '300px',
            }}
            options={topoOptions.map((item) => ({
              value: item.value,
              label: item.label,
            }))}></Select>
        </Form.Item>
        <Form.Item label="流模式" name="stream_mode">
          <Radio.Group>
            <Radio value="continuous">连续</Radio>
            <Radio value="burst">突发模式</Radio>
          </Radio.Group>
        </Form.Item>

        <Form.List name="stream_params">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} align="baseline">
                  <Form.Item
                    {...restField}
                    label="类型"
                    name={[name, 'attack_type']}
                    rules={[
                      {
                        required: true,
                        message: '请选择类型',
                      },
                    ]}>
                    <Select
                      className="the-input"
                      style={{
                        width: '250px',
                      }}
                      onChange={selectAttack}>
                      {theOptions.map((item) => {
                        return (
                          <Option key={item.label} value={item.value}>
                            {item.label}
                          </Option>
                        )
                      })}
                    </Select>
                  </Form.Item>

                  <Form.Item
                    {...restField}
                    label="占比"
                    name={[name, 'rate']}
                    initialValue={10}
                    rules={[
                      {
                        required: true,
                        message: '请填写占比',
                      },
                    ]}>
                    <Input
                      style={{
                        width: '80px',
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="时间"
                    name={[name, 'attack_time']}
                    initialValue={10}
                    rules={[
                      {
                        required: true,
                        message: 'Missing last name',
                      },
                    ]}>
                    <Input
                      style={{
                        width: '80px',
                      }}
                    />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}>
                  添加攻击
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    )
  }


  return (
    <>
      <h3>{`${TheStr}实例`}</h3>
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
        width="800px"
        title={isEdit ? `编辑${TheStr}` : `新增${TheStr}`}
        open={isModalOpen}
        onOk={() => handleOk(form)}
        onCancel={handleCancel}
        afterClose={afterClose}>
        <Tabs
          defaultActiveKey="setting"
          items={[
            {
              label: `配置`,
              key: 'setting',
              children: <TheForm></TheForm>
            },
            {
              label: `网络拓扑`,
              key: 'netCfg',
              children: <TheForm></TheForm>
            },
          ]}
        />
      </Modal>
    </>
  )
}

export default DosIcmp
