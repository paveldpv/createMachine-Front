import React from 'react'
import { useState } from 'react'
import axios from 'axios';

import GoogleIcon from '../additional/GoogleIcon/GoogleIcon';
import AddPerformer from '../AddPerformer/AddPerformer';
import Modal from '@mui/material/Modal';
import DialogEmail from '../additional/DialogEmail/DialogEmail';

import { url } from '../../config/config';
import './CardPerformer.css'


function sendSummaryOrder(email=`Paveldpv91g@yandex.ru`,id){
  let summaryOrder = {
      performerID: id,
      role:`admin`,
      extendedEmail:email      
    }
    axios.post(url+`summaruOrder`,summaryOrder)
    .then(res=>{
      console.log(res.data);
      alert(`сводка отправлена`)
    })
    .catch(err=>{
      console.log(err);
      alert(`произошел сбой проверьте соединение с интернетом или что то еще (=`)
    })
}

export default function CardPerformer(props) {
  
  const [open , setOpen ]          = useState(false)
  const [openDialog,setOpenDialog] = useState(false)
  

  const removeCounterparty =(e)=>{    
    let id =e.target.parentNode.getAttribute(`data-id`)
    axios.delete(url+`deletePerformer?id=${id}`)
      .then(res=>props.setCounterparty(res.data))
  }

  const editPerformer =()=>{
    setOpen(true)
  }
  const copyEmail = ()=>{    
    navigator.clipboard.writeText(props.performer.email)
  }
  const sendOrders=(e)=>{    
    setOpenDialog(true)    
  }

  return (
    <div className='cardPerformer'>
        <div className='cardHeader'>
          {props.performer.name}
          <span data-id={props.performer.id} onClick={removeCounterparty}>
            <GoogleIcon icon={`delete`} color={`#fedfaa`}/>
          </span>
        </div>
        <hr />
        <div className="cardInfo">
          <ul>
            <li>имя : {props.performer.name} </li>
            <li>номер телефона : {props.performer.phone} </li>
            <li>
              эл.почта : {props.performer.email}
              <span onClick={copyEmail}>
                <GoogleIcon icon={`content_copy`} color={`#fedfaa`}/>
              </span>
            </li>
            <li>
              id Телеграмма  :{props.performer.idTelegram}
            </li>
            <li>
              ключевые слова : {props.performer.keyWords}
            </li>
          </ul>
        </div>
        <hr />
        <div className="redaction">
          <button onClick={editPerformer}>
            <GoogleIcon icon={`edit`} />
            Изменить 
          </button>
          <button id={props.performer.id} onClick={sendOrders}>
            <GoogleIcon icon={`priority_high`}/>
            Выслать сводку
          </button>
        </div>

        <Modal
        open={open}>
          <div className='WindowsModal infoPerformer'>           
          <AddPerformer open={setOpen}

          id              = {props.performer.id}
          name            = {props.performer.name}
          email           = {props.performer.email}
          phone           = {props.performer.phone}
          idTelegram      = {props.performer.idTelegram}
          keyWords        = {props.performer.keyWords}
          setCounterparty = {props.setCounterparty}
          />
          </div>
        </Modal>

        <DialogEmail
        open={openDialog}
        setOpen={setOpenDialog}
        id={props.performer.id}       
        />

    </div>
  )
}
