import { message } from "antd";
import { useEffect, useState } from "react";
import tip from './Tips.js'


function useCommonFn (list, del, create, update, detail, copy, setFieldData, setAddForm, ishandleAdd = false,) {
  const [data, setData] = useState([])

  const [current, setCurrent] = useState(1)
  const [page_size, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

  const [selectedRowKeys, setkeys] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)

  const [isEdit, setIsEdit] = useState(false)

  const [fileName, setFileName] = useState('')

  const [theId, setTheId] = useState('')

  function getAllList () {
    let params = {
      page_size: page_size,
      page: current,
    }
    getList(params)
  }

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
      let addParams = null
      // 判定是否需要额外处理新增表单
      if (ishandleAdd) {
        addParams = setAddForm(value)
      } else {
        addParams = value
      }
      const res = await create(addParams)
      tip(res)
      setIsModalOpen(false)
      form.resetFields()
      getAllList()
    } catch (error) {
      console.log(error);
    }
  }

  async function updateData (form) {
    try {
      setIsEdit(true)
      await form.validateFields()
      const value = form.getFieldValue()
      const res = await update(value)
      tip(res)
      setIsModalOpen(false)
      form.resetFields()
      getAllList()
    } catch (error) {
      console.log(error);
    }
  }

  const editData = async (form, record) => {

    try {
      let params = {
        id: record.id
      }
      const { data } = await detail(params)

      setIsEdit(true)
      setIsModalOpen(true)
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
    }
    getList(params)

  }

  const onShowSizeChange = (current, size) => {
    let params = {
      page_size: size,
      page: current,
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
      const { data, count, page_size, page } = await list(params)
      setData(data)
      setCurrent(page)
      setTotal(count)
      setPageSize(page_size)

    } catch (error) {
      console.log(error)
    }
  }

  const copyData = async (id) => {
    try {
      let params = {
        id: id,
      }
      const res = await copy(params)
      tip(res)
      getAllList()
    } catch (error) {
      console.log(error)
    }
    console.log("copyData")
  }

  const reflash = () => {
    getAllList()
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
        ids: selectedRowKeys
      }
      const res = await del(parmas)
      tip(res)
      setkeys([])
      getAllList()

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllList()
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
