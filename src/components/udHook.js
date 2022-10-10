import { useEffect, useState } from 'react'

export function useList (Api) {
  const [dataSource, setData] = useState([])
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)
  const [page_size, setPageSize] = useState(5)

  const getList = async (params) => {
    try {
      const { data, count, page } = await Api(params)
      setData(data)
      setCount(count)
      setPage(page)
    } catch (error) {
      console.log(error)
    }
  }

  const pageChange = (page, size) => {
    console.log(page, size)
    let params = {
      page,
      page_size: size,
    }
    getList(params)
  }

  useEffect(() => {
    let params = {
      page,
      page_size,
    }
    console.log('这里执行了')
    getList(params)
  }, [])

  return dataSource, page, page_size, count, setPageSize
}