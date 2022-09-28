import React from 'react'
import { useState } from 'react'

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { emailRegEx } from '../../../config/validationRegEx';
import { url } from '../../../config/config';
import axios from 'axios';


function sendSumarryOrder(id,email=`Paveldpv91g@yandex.ru`){
   let summaryOrder = {
       performerID: id,
       role:`admin`,
       extendedEmail:email     
     }
     console.log(summaryOrder);

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



export default function DialogEmail(props) {
   let setOpen          = props.setOpen
   let open             = props.open
   let id               = props.id
   

   const [exteinsionEmail,setExteinsionEmail] = useState(``)
   const [error,setError]                     = useState(false)

   const sendOrderExteinsionEamil =()=>{   
      if(emailRegEx.test(exteinsionEmail)){

         sendSumarryOrder(id,exteinsionEmail)
         setOpen(false)
      }
      else{
         setError(true)
         setTimeout(() => {
            setError(false)
         }, 700);
      }
     
   }
   const sendOrder=()=>{
      sendSumarryOrder(id)
         setOpen(false)
   }

  return (
    <div>      
      <Dialog open={open} onClose={()=>setOpen(false)}>
        <DialogTitle>Дополнительная электронная почта</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Введите дополнительный адрес электронной почты для дублирования на нее сводки по текущему контрагенту
            (если это необходимо)
          </DialogContentText>
          <TextField
            error={error}
            onChange={(e)=>setExteinsionEmail(e.target.value)}
            autoFocus
            margin="dense"
            id="name"
            label="Дополнительный адрес электронной почты"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={sendOrder}>Дублирование не нужно</Button>
          <Button onClick={sendOrderExteinsionEamil}>Принять</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
