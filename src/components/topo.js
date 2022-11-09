import { list as topuLists } from '@/api/template/netcfg.js'
import { useState, useEffect } from 'react'

function useTopo () {
  const [topoList, setTopu] = useState([])
  const [topoOptions, setOptions] = useState([])

  async function getList () {
    try {
      let params = {
        page: 1,
        pageSize: 10000
      }
      const { data } = await topuLists(params)
      setTopu(data)

      let tmp = data.map(item => {
        const theItem = {
          value: item.id,
          label: item.network_name,
        }
        return theItem
      })

      setOptions(tmp)


    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getList()
  },[])
  return {
    topoList,
    topoOptions
  }
}

export {
  useTopo
}