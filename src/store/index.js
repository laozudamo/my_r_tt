import { configureStore } from '@reduxjs/toolkit'

import counter from './test'
import test2 from './test2'

const store = configureStore({
  reducer: {
    counter,
    test2
  }
})

export default store