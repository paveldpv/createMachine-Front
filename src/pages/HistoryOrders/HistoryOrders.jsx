import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { url } from '../../config/config'


import FilterTextField from '../../component/FilterTextField/FilterTextField'
import GoogleIcon from '../../component/additional/GoogleIcon/GoogleIcon'
import Loader from '../../component/additional/Loader/Loader'

export default function HistoryOrders() {

  const [loader,setLoader]=useState(true)
  const [historyOrders,setHisitoryOrders]=useState([])

  useEffect(()=>{
    axios.post(url+`historyorder`).then(res=>{      
      setHisitoryOrders(res.data)
      setLoader(false)      
    })       
  },[])
 

  return (
    <div className='box'>
      <div className="search">
         <FilterTextField/>
      <NavLink to='/Order'>
         <span className='openSB'>
            <GoogleIcon icon={`undo`} color={`#fedfaa`}/>
            Назад
         </span>
      </NavLink>
      </div>
      <hr />
      <div className="headeOrder">
      <Loader opacity={loader}/>

      </div>

    </div>
  )
}
