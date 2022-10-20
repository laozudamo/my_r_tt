import { message } from "antd";
import { useEffect, useState } from "react";
import tip from './Tips.js'


function useCommonFn (attackList, attackdel, attackCreate, attackUpdate, attackDetail, setFieldData) {
  const [data, setData] = useState([])

  const [current, setCurrent] = useState(1)
  const [page_size, setPageSize] = useState(20)
  const [total, setTotal] = useState(0)
  const [attack_class_id, setId] = useState('')

  const [selectedRowKeys, setkeys] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isEdit, setIsEdit] = useState(false)

  const [fileName, setFileName] = useState('')

  const [theId, setTheId] = useState('')

  const showModal = () => {
    setIsModalOpen(true)
  }

  const afterClose = () => {
    setIsEdit(false)
    setFileName('')
  }

  async function addNewData (form) {
    try {
      const value = await form.validateFields()
      const TYPE = 'json'
      const passParams = Object.assign({}, value, { file_type: TYPE })
      const res = await attackCreate(passParams)
      tip(res)
      setIsModalOpen(false)
      form.resetFields()
      let params = {
        page_size: page_size,
        page: current,
        attack_class_id
      }
      getList(params)
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData (form) {
    try {
      setIsEdit(true)
      const value = await form.validateFields()
      const TYPE = 'json'
      // TODO 更新和创建的JSON格式不一样
      const passParams = Object.assign({}, value, { file_type: TYPE, file_name: fileName, pk: theId })
      const res = await attackUpdate(passParams)
      tip(res)
      setIsModalOpen(false)
      form.resetFields()

      let params = {
        page_size: page_size,
        page: current,
        attack_class_id
      }
      getList(params)
    } catch (error) {
      console.log(error);
    }
  }


  const editData = async (form, record) => {
    setIsEdit(true)
    setIsModalOpen(true)
    try {
      let parmas = {
        pk: record.id
      }
      const { data } = await attackDetail(parmas)
      // 判断是否有file_name属性
      const KEY = 'file_name'
      if (KEY in data) {
        setFileName(data.file_name)
      }

      setTheId(data.id)
      setFieldData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleOk = async (form) => {
    try {
      if (isEdit) {
        await updateData(form)
        return
      }
      await addNewData(form)
    } catch (error) {
      console.log(error);
    }
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const onSelectChange = (keys) => {
    setkeys(keys)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  }

  const onChange = (page, pageSize) => {
    let params = {
      page_size: pageSize,
      page: page,
      attack_class_id
    }
    getList(params)

  }

  const onShowSizeChange = (current, size) => {
    let params = {
      page_size: size,
      page: current,
      attack_class_id
    }
    getList(params)
  }

  const pagination = {
    current: current,
    pageSize: page_size,
    total: total,
    onChange: onChange,
    onShowSizeChange: onShowSizeChange,
  }

  const getList = async (params) => {
    try {
      const { data, count, page_size, page } = await attackList(params)
      setData(data)
      setCurrent(page)
      setTotal(count)
      setPageSize(page_size)

    } catch (error) {
      console.log(error)
    }
  }


  const copyData = () => {
    console.log("copyData")
  }

  const reflash = () => {
    let params = {
      page_size: page_size,
      page: current,
      attack_class_id
    }
    getList(params)
  }

  const addData = (form) => {
    form.resetFields()
    showModal()
  }

  const deleteData = async () => {
    if (!selectedRowKeys.length) {
      message.error('请选择删除项', 1);
      return;
    }
    try {
      let parmas = {
        pkts: selectedRowKeys
      }
      const res = await attackdel(parmas)
      tip(res)
      let p = {
        page_size: page_size,
        page: current,
        attack_class_id
      }
      setkeys([])
      getList(p)
      console.log(res);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    let params = {
      page_size: page_size,
      page: current,
      attack_class_id
    }

    getList(params)
  }, [])

  return {
    data,
    pagination,
    rowSelection,
    isModalOpen,
    isEdit,
    reflash,
    addData,
    deleteData,
    handleOk,
    handleCancel,
    editData,
    copyData,
    afterClose

  }
}

export default useCommonFn
