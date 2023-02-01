import React from 'react'
import { useReducer} from 'react'

const initialValue = {
    firstCounter:0,
}

const reducer = (state,action)=>{
    switch(action){
      case "add to cart":
        return {firstCounter: state.firstCounter + 1}
      case "remove from cart":
        return {firstCounter: state.firstCounter - 1}
      case "reset cart":
        return initialValue
      default:
        return state
    }
}

function Usereducer2() {
  let [state,dispatch] = useReducer(reducer,initialValue)
  return (
    <div>
        <h1>{state}</h1><br />
        <button onClick={()=>{dispatch('add to cart')}}>Add to cart</button><br /><br />
        <button onClick={()=>{dispatch('remove from cart')}}>Remove from cart</button><br /><br />
        <button onClick={()=>{dispatch('reset cart')}}>Reset cart</button>
    </div>
  )
}

export default Usereducer2