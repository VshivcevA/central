// import React from 'react'
// import type {RootState} from '../../app/store'
// import {useDispatch, useSelector} from 'react-redux'
import {decrement, increment} from './counterSlice'
import {useAppDispatch, useAppSelector} from "../../app/hooks";

export function Counter() {
    console.log('counter')
    // const count = useSelector((state: RootState) => state.counter.value)
    // const dispatch = useDispatch()
    // The `state` arg is correctly typed as `RootState` already
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()

    return (
        <div>
            <div>
                <button
                    aria-label="Increment value"
                    onClick={() => dispatch(increment())}
                >
                    Increment
                </button>
                <span>{count}</span>
                <button
                    aria-label="Decrement value"
                    onClick={() => dispatch(decrement())}
                >
                    Decrement
                </button>
            </div>
        </div>
    )
}