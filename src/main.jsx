import ReactDOM from 'react-dom/client'
import zhCN from 'antd/es/locale/zh_CN'
import { ConfigProvider } from 'antd'
import App from './App'

import store from './store'
import { Provider } from 'react-redux'

import 'normalize.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ConfigProvider locale={zhCN} componentSize={'small'}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
)
