import { useEffect, useState } from "react";

function useCommonFn (attackList) {
  const [data, setData] = useState([])
  const [params, setParams] = useState({
    page_size: 10,
    page: 1,
    attack_class_id: ''
  })

  const onChange = (page, pageSize) => {
    console.log('onChange', page, pageSize)
  }
  const onShowSizeChange = (current, size) => {
    console.log(current, size)
  }

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
    total: 100,
    onChange: onChange,
    onShowSizeChange: onShowSizeChange,
  })

  const getList = async () => {
    try {
      const { data } = await attackList(params)
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  const reflash = () => {
    getList()
  }

  const addData = () => {
    console.log('addData')
  }

  const deleteData = () => {
    console.log('deleteData')
  }

  useEffect(() => {
    getList()
  }, [])

  return {
    data,
    pagination,
    reflash,
    addData,
    deleteData,
  }
}

export default useCommonFn
