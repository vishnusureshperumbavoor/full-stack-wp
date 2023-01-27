import React,{useContext} from 'react'
import { AppContext } from '../AppContext'

function Three() {
    const {data} = useContext(AppContext)
  return (
    <div style={{backgroundColor:'green'}}>
        <h1>{data}</h1>
        <h1>Three</h1>  
    </div>
  )
}

export default Three