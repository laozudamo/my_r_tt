// import { useSelector, useDispatch } from 'react-redux'
// import { decrement, increment } from '@/store/test'

// function Report() {
//   const count = useSelector((state) => state.counter.value)
//   const v = useSelector((state) => state)
//   console.log(v)
//   const dispatch = useDispatch()

//   return (
//     <div>
//       <h1>{count}</h1>
//       <button onClick={() => dispatch(decrement())}>减少</button>
//     </div>
//   )
// }

// export default Report
import { Image } from 'antd'
import img from './test.png'

function Report () {
  return (
    <div className='main-content'>
      <Image height={800} width={1200} src={img}></Image>
    </div>
  )
  
}

export default Report