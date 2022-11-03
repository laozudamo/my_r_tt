import { useSelector, useDispatch } from 'react-redux'

function Port() {
  const count = useSelector((state) => state.counter.value)
  const v = useSelector((state) => state)
  console.log(v)
  const dispatch = useDispatch()

  return (
    <div className='main-content'>
    </div>
  )
}

export default Port
