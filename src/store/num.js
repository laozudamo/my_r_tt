import { makeAutoObservable } from "mobx"

class Numer {
  num = 1

  constructor() {
      makeAutoObservable(this)
  }

  setNum(num) {
      this.num  = num
  }

}

const numer = new Numer()
export default numer