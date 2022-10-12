import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment } from '@/store/test'
import { Image } from 'antd'
import img from './test.png'

function Port() {
  const count = useSelector((state) => state.counter.value)
  const v = useSelector((state) => state)
  console.log(v)
  const dispatch = useDispatch()

  return (
    <div className='main-content'>
      <Image height={900} width={1100} src={img}></Image>
    </div>
  )
}

export default Port
