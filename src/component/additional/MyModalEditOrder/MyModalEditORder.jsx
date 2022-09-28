import React, { useState } from 'react'
import axios from 'axios';

import { url } from '../../../config/config';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Slider from '@mui/material/Slider';

import { getNumberAndName } from '../../../function/getNameOrNumber';

export default function MyModalEditORder(props) {

   const [amount ,setAmount]=useState(1)

   const removePathOrder = ()=>{
      let pathOrder={
         idGroup  : props.order.idGroup,
         idOrder  : props.order.id,
         setAmount: props.order.amount-amount,
         dataOrder: {...props.order,amount:amount}
      }      
      axios.post(`${url}setorder/removepathorder`,pathOrder)
         .then(res=>{
            res.data==`ok`&& 
            axios.post(url+`order`).then(order=>{
               props.setOrder(order.data)
               props.setOpen(false)
               setAmount(1)
            })
         })
      
   }


  return (
    <Modal
    open={props.open}
    onClose={()=>props.setOpen(false)} >
      <div className="WindowsModal">
      <p>Деталь : {getNumberAndName(props.order.order).name} </p>
      <p>Закакзана в количстве : {props.order.amount} {props.order.units}</p>
      <p>Укажите какое количество <span style={{color:`red`}}>пришло</span> </p>
      <Slider style = {{ color:'#c62828'}}value={amount}
         step={1}  valueLabelDisplay="auto"  marks
         min={1} max={props.order.amount-1}   
         onChange={(e)=>setAmount(e.target.value)}       
         />
      <Button onClick={removePathOrder}
      variant="contained" color="success">
         Принять
      </Button>
      </div>      
    </Modal>
  )
}
