import { useEffect, useState } from 'react';
import React from 'react'

import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import GoogleIcon from '../GoogleIcon/GoogleIcon';
import ControlIcon from '../ControlIcon/ControlIcon';

import axios from 'axios';
import moment from 'moment'
import { url } from '../../../config/config';

import './MyModalEditDebt.css'

export default function MyModalEditDebt(props) {
  
  const stylesModal = {
    root: {
      backgroundColor: "transparent"
    },    
  };
  let open    = props.open
  let id      = props.id||0
  let price   = props.price||0
  let product = props.product||`имя не передано`
  let people  = props.people||`имя не передано`
  let type    = props.type||`не указан тип запроса`
  let setOpen = props.setOpen
  let setData= props.setData||null
  
  const [newPrice,setNewPrice]     = useState()
  const [newProduct,setNewProduct] = useState()
  const [typeDebt , setTypeDebt]        = useState(`add`)

  const edit =async(e)=>{
    if(e.target.classList.contains(`material-icons`)){
      let debt ={
        people:people,
        id:id,
        data: {
          date:moment().format(`L`),
          product:newProduct,
          price:typeDebt==`remove`?newPrice*(-1):newPrice,    
          role:`admin`     
        }

      }
      setOpen(false)
     await axios.post(url+type,debt)
          .then(res=>console.log(res.data))
          .catch(err=>console.log(err))
     axios.post(url+`debts`)
          .then(res=>setData(res.data))
        
    }
  }

  const remove = async (e) =>{
   if(e.target.classList.contains(`material-icons`)){
      let debt ={
        people:people,
        id:id,
        data:null
      }
      setOpen(false)
      
      await axios.post(url+`removedebts`,debt)
        .then(res=>{
           console.log(res.data);
        })
       axios.post(url+`debts`)
          .then(res=>setData(res.data))

   }
   
   
  }

  
  return (
    <> 
       <Modal
       style={stylesModal}
       open={open} >
        <div className='WindowsModal editDebt'>
          <div className="editHeader">
            <span>
              изменить значение у {people}
            </span>
            <span onClick={()=>setOpen(false)} >              
              <ControlIcon title={`закрыть`} icon={`close`}/>
            </span>
            
          </div>

          <span>
            <hr style={{ backgroundColor: `#fedfaa`}} />
          </span>
          
          <div className="currentDetail">
            <span>{newProduct||product}</span>
            <span>{newPrice||price}</span>
          </div>
          <div className="edit">
            <TextField value={newProduct||product}
            onChange={(e)=>setNewProduct(e.target.value)}/>        

            <TextField value={newPrice||price}
            onChange={(e)=>setNewPrice(e.target.value)} 
            />
            <div>
            <div>
              <Select  style={{width:`99%`}}
              value={typeDebt}
              defaultValue={`add`}
              onChange={e=>setTypeDebt(e.target.value)}>                
                 <MenuItem   value={`add`}>Оплата\Закупка детали\услуги</MenuItem>
                 <MenuItem value={`remove`}>Продажа детали\оказание услуг</MenuItem>
              </Select>
            </div>
            </div>
            <div className='iconControl'>
              <span 
              onClick={edit}>
                <ControlIcon title={`сохранить`} icon={`save`} />               
              </span>
              <span 
              onClick={remove}>
                 <ControlIcon title={`удалить`} icon={`delete`} />                 
              </span>
            </div>
          </div>
        </div>
   
      </Modal>
  </>
  )
}
