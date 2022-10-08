
import { message } from 'antd'
const success = (msg) => {
  message.success(`${msg}`, 1);
};

const error = (msg) => {
  message.error(`${msg}`, 1);
};

function tip (res) {
  const { code, msg } = res
  code === 0 ? success(msg) : error(msg)
}

export default tip