import React from 'react'
import { useReducer} from 'react'
import {useNavigate} from "react-router-dom"

const initialValue = 0 
const reducer = (state,action)=>{
    switch(action){
      case "add to cart":
        return state+1 
      case "remove from cart":
        return state-1 
      case "reset cart":
        return initialValue
      default:
        return state
    }
}

function Usereducer() {
  const navigate = useNavigate()
    let [state,dispatch] = useReducer(reducer,initialValue)
    // let result2 = useState(initialValue)
    //console.log(`usestate === ${result2}`);
  return (
    <div>
        <h1>{state}</h1><br />
        <button onClick={()=>{dispatch('add to cart')}}>Add to cart</button><br /><br />
        <button onClick={()=>{dispatch('remove from cart')}}>Remove from cart</button><br /><br />
        <button onClick={()=>{dispatch('reset cart')}}>Reset cart</button><br /><br />
        <button onClick={()=>navigate('/usereducer2')}>Go to usereducer 2</button>
    </div>
  )
}

export default Usereducer