
import { message } from 'antd'
const success = (msg) => {
  message.success(`${msg}`, 1);
};

function tip (res) {
  const { code, msg } = res
  if(code === 0 ) {
    success(msg)
  }
 
}

export default tip