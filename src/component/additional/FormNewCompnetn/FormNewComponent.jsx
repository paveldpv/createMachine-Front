import React, { useState } from 'react'
import {url} from './../../../config/config'

import Modal from '@mui/material/Modal';
import GoogleIcon from '../GoogleIcon/GoogleIcon';
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import uniqid from 'uniqid'
import moment from 'moment'
import axios from 'axios'


import './FormNewComponent.css'

export default function FormNewComponent(props) {
  
   const [name,setName]    = useState(props.name||``)
   const [units,setUnits]  = useState(props.units||`шт`)
   const [src,setSrc]      = useState(props.src||`https://www.car72.ru/images/catalog/b_1581.jpg`)
   const [erorr ,setErorr] = useState(false)

   const saveComponent = async ()=>{
    if(!name.length==0){
      let component ={
         name : name,
         units: units,
         src  : src,
         id   : uniqid(),
         date : moment().format(`LL`)
      }
   
     let res= await axios.post(`${url}otherorder/${props.redaction?`setcomponent`:`addnewcomponent`}`,{
         idGroup:props.idGroup,
         data:component
      })
     
      if(res.data==`ok`){
         let data = await axios.post(`${url}otherorder`)
         props.setOtherProducts(data.data)
         props.setOpenForm(false)
      }
      else{
         alert(`что то пошло не так- поробуйте позже`)
         props.setOpenForm(false)
      }
    }
    else{
      setErorr(true)
      setTimeout(() => {
         setErorr(false)
      }, 2000);
    }
   }


  return (
    <Modal
    open={props.openForm}    
    >
       <div className='WindowsModal'>
         <div className='editHeader newComponent'>
               <span className='Header'>{props.redaction?`Изменить текущую`:`Добавить новую`} деталь</span>
               <span onClick={() => props.setOpenForm(false)}>
                  <GoogleIcon icon={`close`} />
               </span>            
         </div>
         <hr style={{ backgroundColor: `#fedfaa`,width:`100%`  }} />
         <div className="body">
            <ul  className='formCouterparty'>
               <li>
                  название*  <TextField value={name}
                    multiline onChange={(e)=>setName(e.target.value)} error={erorr}/>
               </li>
               <li>
                  единицы измерения
                  <Select
                  value={units}
                  onChange={(e)=>setUnits(e.target.value)}
                  defaultValue={`шт`}>
                     <MenuItem value={`мм`}>Милиметры</MenuItem>
                     <MenuItem value={`шт`}>Штуки</MenuItem>
                     <MenuItem value={`М`}>Метры</MenuItem>
                     <MenuItem value={`кг`}>Килограммы</MenuItem>
                  </Select>
               </li>
               <li>
                  *ссылка на картинку
                  <TextField  value={src}
                  multiline onChange={(e)=>setSrc(e.target.value)}/>
               </li>
            </ul>
            <hr style={{ backgroundColor: `#fedfaa`,width:`100%`  }} />
            <span className="bottom">
               <p>*В название должно быть отражены все характеристики,например:</p>              
               <ul>
                  <li>круг диаметром 120 СТ40Х </li>
                  <li>винт с внутреним шестриграником м8*15</li>
                  <li>шланг резиновый 28*32 </li>
                  <li>штифт конический DIN1 5*60</li>
               </ul>              
            
            </span>
         </div>
         <hr style={{ backgroundColor: `#fedfaa`,width:`100%` }} />
         <div className='editHeader control'>
               <span onClick={saveComponent}>
                  сохранить
                  <GoogleIcon icon={`save`} />
               </span>               
         </div>
       </div>
       
    </Modal>
  )
}
 