import React,{useState} from 'react'

function Usememo() {
    const [Counter, setCounter] = useState(0)
    const [Counter2, setCounter2] = useState(0)
    const addToCart = ()=>{
        setCounter(Counter + 1);
    }
    const removeFromCart=()=>{
        setCounter(Counter - 1);
    }
  return (
    <div>
        <h1>usememo</h1>
        <button onClick={addToCart}>Add to cart : {Counter}</button><br />
        <button onClick={removeFromCart}>Remove from cart : {Counter}</button>
    </div>
  )
}

export default Usememo