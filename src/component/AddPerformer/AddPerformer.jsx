import React from 'react'
import GoogleIcon from '../additional/GoogleIcon/GoogleIcon'
import TextField from '@mui/material/TextField'

import { useState } from 'react'
import { useRef } from 'react'
import axios from 'axios'
import moment from 'moment'
import uniqid from 'uniqid'

import {url} from '../../config/config'
import { phoneRegEx,emailRegEx } from '../../config/validationRegEx'
import './AddPerformer.css'


export default function AddPerformer(props) {

   

   const [name, setName]             = useState(props.name       || ``)
   const [phone, setPhone]           = useState(props.phone      || ``)
   const [email, setEmail]           = useState(props.email      || ``)
   const [keyWords, setKeyWords]     = useState(props.keyWords   ||``)
   const [idTelegram, setIdTelegram] = useState(props.idTelegram ||``)
   const [price, setPrcie]           = useState(``)
   const [erorr, setError]           = useState(false)

   const uploadFile = (e)=>{
      e.preventDefault()
      if(e.target.files[0]){
         setPrcie(e.target.files[0])
      }
   }

   const submitPerformer = () => {
      if (name.trim().length == 0 || !phoneRegEx.test(phone) || !emailRegEx.test(email)) {
         setError(true)
         setTimeout(() => {
            setError(false)
         }, 2000);
      }
      else {
         let newPerformer = {
            name,
            phone,
            email,
            keyWords: keyWords ? keyWords.split(` `).join(`|`) : ``,
            idTelegram,
            date:moment().format(`L`),
            id:props.id || uniqid()           

         }         
         axios.post(url+`addnewperformer`,newPerformer)
         .then(res=>{            
            props.setCounterparty(res.data)            
         })
         props.open(false)
      }
      
   }



   const clearForm = () => {
      setName(``)
      setEmail(``)
      setIdTelegram(``)
      setKeyWords(``)
      setPhone(``)
   }

   return (
      <div >
         <div className='editHeader'>
            <span className='Header'>Добавить новго контрагента/исполнителя</span>
            <span onClick={() => props.open(false)}>
               <GoogleIcon icon={`close`} />
            </span>
         </div>
         <hr style={{ backgroundColor: `#fedfaa` }} />
         <div className='formCouterparty'>
            <ul>
               <li>
                  {name || `имя *`}
                  <TextField
                     multiline onChange={(e) => setName(e.target.value)}
                     error={erorr} value={name} />
               </li>
               <li>
                  {phone || `номер телефона *`}
                  <TextField
                     multiline type={`tel`} onChange={(e) => setPhone(e.target.value)}
                     error={erorr} value={phone} />
               </li>
               <li>
                  {email || `электронная почта *`}
                  <TextField
                     multiline type={`email`} onChange={(e) => setEmail(e.target.value)}
                     error={erorr} value={email} />
               </li>
               <li>
                  ключевые слова
                  <TextField
                     multiline onChange={(e) => setKeyWords(e.target.value)}
                     value={keyWords} />
               </li>
               <li>
                  {idTelegram || `id телеграмма`}
                  <TextField
                     multiline type={`number`} onChange={(e) => setIdTelegram(e.target.value)}
                     value={idTelegram} />
               </li>
               <li>
                  прайс
                  <label htmlFor="file" >
                     {price.name||<GoogleIcon icon={`add`} onChange={(e) => setPrcie(e.target.value)} />}                     
                  </label>
                  <input type="file" name="counterparty" id="file" className="inputfile" accept=".json"
                  onChange={uploadFile} />
               </li>
            </ul>
            <hr style={{ backgroundColor: `#fedfaa` }} />
            <div className='editHeader control'>
               <span onClick={submitPerformer}>
                  сохранить
                  <GoogleIcon icon={`save`} />
               </span>
               <span onClick={clearForm}>
                  очисть форму
                  <GoogleIcon icon={`clear_all`} />
               </span>
            </div>
         </div>
      </div>
   )
}
