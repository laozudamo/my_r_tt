import { makeAutoObservable } from "mobx"
// import { login, logout, userInfo } from '@/api/user'

class User {
  name = '1212'
  token = ''

  constructor() {
      makeAutoObservable(this)
  }

  setName(name) {
      this.name  = name
  }


  // login (data) {
  //   return new Promise(async (reslove, reject) => {
  //     try {
  //       let res = await login(data)
  //       const { token } = res.data
  //       this.token = token
  //       localStorage.setItem('token', token)
  //       reslove()
  //     } catch (error) {
  //       reject(error)
  //     }
  //   })
  // }

  setToken(token) {
    this.token = token
  }
}

const user = new User()
export default user