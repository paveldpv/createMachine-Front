import React, { useState } from 'react'

import axios from 'axios';
import {Lightbox} from "react-modal-image"

import { url } from '../../config/config';


import MyModalEditORder from '../additional/MyModalEditOrder/MyModalEditORder';
import ControlIcon from '../additional/ControlIcon/ControlIcon';

import {getNumberAndName} from '../../function/getNameOrNumber'

import './OrderList.css'

export default function OrderList(props) {
  
  let   performer                      = props.order.performer
  const [openImage,setOpenImage]       = useState(false)  
  const [open,setOpen]                 = useState(false)

  const removeOrder =  async(e)=>{    
    const idRemove = props.order.id
    const idGroupRemove = props.order.idGroup
    await axios.delete(`${url}setorder?idRemove=${idRemove}&idGroupRemove=${idGroupRemove}`)
    .then(res=>console.log(res)    
    )
    .catch(eror=>console.log(eror))

     axios.post(url+`order`).then(res=>{
      console.log(`qure`);
      props.setOrder(res.data)})    
  }
  const urgentOrder =  async(e)=>{    
    const id = props.order.id
    const idGroup = props.order.idGroup
    const urgentOrder ={
      id:id,
      idGroup:idGroup
    } 
   await axios.post(`${url}setorder/urgent`,urgentOrder).then(res=>console.log(res))
   
   axios.post(url+`order`).then(res=>{
    console.log(`qure`);
    props.setOrder(res.data)}) 
  }
  
  
  return (
    <>
    <MyModalEditORder open={open} setOpen={setOpen}
     setOrder={props.setOrder} order={props.order}
     />
      <ul className={props.order.urgent?"listOrder red":"listOrder"}>
        <li onClick={()=>setOpenImage(true)}>
          {openImage &&
            (<Lightbox            
            large={props.order.src}
            onClose={()=>setOpenImage(false)}
            />)}          
          {<ControlIcon title={`показать чертеж`} icon={`image`} color={props.order.urgent?`#c62828`:``}/>}          
        </li>
        <li>
          {getNumberAndName(props.order.order).name}
        </li>
        <li>{props.order.amount}</li>
        <li>{props.order.date}</li>
        <li>
          <ul >
            <li>{performer.name}</li>
            <li>{performer.phone}</li>
            <li>{performer.email}</li>
          </ul>
        </li>
        <li>
          <ul className='listIcon'>
            <li onClick={removeOrder} >              
              <ControlIcon title={`удалить/заказ пришел`} icon={`delete`} color={props.order.urgent?`#c62828`:``} />
            </li>            
            <li onClick={urgentOrder} >                 
                {!props.order.urgent&&
                <ControlIcon title={'изменить приоритет'} icon={`priority_high`}/>}    
            </li>
            <li onClick={()=>setOpen(true)}>
              {props.order.amount>1 &&
                <ControlIcon title={`подтвердить часть заказа`} icon={`delete_sweep `} color={props.order.urgent?`#c62828`:``}/>}
            </li>
          </ul>
        </li>
      </ul>
      <hr />
    </>
  )
}




