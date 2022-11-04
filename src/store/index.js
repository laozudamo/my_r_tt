import React, { useContext } from 'react'
import numer from './num'
import user from './user'

// 自动引入
// const modules = import.meta.glob('./*.js')
// const moduleName = Object.keys(modules).map(item => {
//   let v = item.split('/').pop().split('.').shift()
//   return v
// })

class RootStore {
  constructor() {
    this.numer = numer
    this.user = user
  }
}

const rootStore = new RootStore()
const context = React.createContext(rootStore)
const useStore = () => useContext(context)

export { useStore }