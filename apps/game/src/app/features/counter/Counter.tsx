import { decrement, increment } from './counterSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'

export function Counter() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  return (
    <div>
      <div>
        <button
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span> {count} </span>
        <button
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
    </div>
  )
}