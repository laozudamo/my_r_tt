import { message } from "antd";
import { useEffect, useState } from "react";
import tip from './Tips.js'


function useCommonFn (list, del, create, update, detail, setFieldData) {
  const [data, setData] = useState([])

  const [current, setCurrent] = useState(1)
  const [page_size, setPageSize] = useState(10)
  const [total, setTotal] = useState(0)

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

      // TODO
      const TYPE = 'json'
      const passParams = Object.assign({}, value, { file_type: TYPE })
      const res = await create(passParams)
      // TODO
      tip(res)
      setIsModalOpen(false)
      form.resetFields()
      let params = {
        page_size: page_size,
        page: current,
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
      //TODO
      const TYPE = 'json'
      const passParams = Object.assign({}, value, { file_type: TYPE, file_name: fileName, id: theId })
      const res = await update(passParams)
      // TODO 非通用问题

      let params = {
        page_size: page_size,
        page: current,
      }

      tip(res)
      setIsModalOpen(false)
      form.resetFields()
      getList(params)
    } catch (error) {
      console.log(error);
    }
  }


  const editData = async (form, record) => {

    try {
      setIsEdit(true)
      setIsModalOpen(true)
      let parmas = {
        id: record.id
      }
      const { data } = await detail(parmas)

      // 报告部分的key
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

    // TODO 非通用问题
    let params = {
      page_size: pageSize,
      page: page,
    }
    // TODO 非通用问题
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
      console.log(count);
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
        ids: selectedRowKeys
      }
      console.log(parmas);
      const res = await del(parmas)
      tip(res)
      setkeys([])

      let p = {
        page_size: page_size,
        page: current,
      }
      getList(p)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let params = {
      page_size: page_size,
      page: current,
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
