import { Image } from 'antd'
import img from './test.png'

function Task () {
  return (
    <div className='main-content'>
      <Image height={800} width={1200} src={img}></Image>
    </div>
  )
  
}

export default Task