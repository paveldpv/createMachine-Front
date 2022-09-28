import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'


import axiox from 'axios'


import {url} from '../../config/config'

import CardPerformer from '../../component/CardPerformer/CardPerformer'
import GoogleIcon from '../../component/additional/GoogleIcon/GoogleIcon'
import Loader from '../../component/additional/Loader/Loader'
import AddPerformer from '../../component/AddPerformer/AddPerformer'

import Modal from '@mui/material/Modal';

import './Counterparty.css'



export default function Couterparty() {

  const [counterparty,setCounterparty] = useState([])
  const [open , setOpen ] = useState(false)
  const [loader ,setLoader]=useState(true)

  useEffect(()=>{
    axiox.get(url+`performer`).then(res=>{
      setCounterparty(res.data)
      setLoader(false)})
  },[])

  return (
    
    <div className='box'>
      <Loader opacity={loader}/>

      <div className='addPerformer'>
        <span onClick={()=>setOpen(true)}>
          Добавить    
          <GoogleIcon icon={`add`} color={`#fedfaa`}/>      
        </span>
      </div>
      <hr />
      <div className='performers'>
      {counterparty.map((performer,index)=>{
        return <CardPerformer performer={performer} setCounterparty={setCounterparty} key={index}/>
      })}
      </div>


      <Modal
        open={open}
        >
          <div className='WindowsModal infoPerformer'>           
          <AddPerformer setCounterparty={setCounterparty} open={setOpen} />
          </div>
        </Modal>

    </div>
  )
}
