import { list } from '@/api/template/fuzzy.js'
import { useState, useEffect } from 'react'

function useFuzzy () {
  const [fuzzyList, setList] = useState([])
  const [fuzzyOptions, setOptions] = useState([])

  async function getList () {
    try {
      let params = {
        page: 1,
        pageSize: 10000
      }
      const { data } = await list(params)
      console.log(data)
      setList(data)

      let tmp = data.map(item => {
        const theItem = {
          value: item.id,
          label: item.fuzz_name,
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
    fuzzyList,
    fuzzyOptions
  }
}

export {
  useFuzzy
}