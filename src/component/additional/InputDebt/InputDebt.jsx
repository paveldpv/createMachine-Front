import React from 'react'
import moment from 'moment'
import uniqid from 'uniqid'
import axios from 'axios'


import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import GoogleIcon from '../GoogleIcon/GoogleIcon'

import './InputDebts.css'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import { url } from '../../../config/config'

import {RRdebts} from './../../../redux/actions'//наверное не то
import { debtsPost } from './../../../redux/actions'

export default function InputDebt(props) {
   
   let dipatch = useDispatch()

   const [price,setPrice]                = useState(0)
   const [product,setProduct]            = useState(``)
   const [erorrProduct ,setErorrProduct] = useState(false)
   const [typeDebt , setTypeDebt]        = useState(`add`)

   const addDebt = async ()=>{
      
      if(product.trim().length==0){         
         setErorrProduct(true)
         setTimeout(() => {
            setErorrProduct(false)
         }, 2000);
      }
      else{            
         let debt ={
            people:props.people,
            data : {
               date:moment().format("L"),         
               id:uniqid(),
               price:typeDebt==`remove`?price*(-1):price,
               product:product,
               senderId:`admin`
            }
           }           
          await axios.post(url+`debts`,debt)//перерендерить компоненты
          axios.post(url+`debts`).then(res=> props.setDebts(res.data))
      }  
     
   }
  

  return (
    <div className='headerDebts inputdebt'>      
        <TextField  label="Деталь" variant="outlined" 
         onChange={(e)=>setProduct(e.target.value)} 
         error={erorrProduct}/>
        <div>
            <Select
            value={typeDebt}
            defaultValue={`add`}
            onChange={e=>setTypeDebt(e.target.value)}>
               <MenuItem   value={`add`}>Оплата\Закупка детали\услуги</MenuItem>
               <MenuItem value={`remove`} >Продажа детали\оказание услуг</MenuItem>
            </Select>
         </div>
        <TextField  label="цена" variant="outlined" type={`number`} 
         value={price}
        onChange={(e)=>setPrice(e.target.value)} />
        <span onClick={addDebt}>
         <span className="mediaText">добавить</span>
         <GoogleIcon icon={`add`}  />
        </span>
    </div>
  )
}
