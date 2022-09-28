import React from 'react'
import { useState } from 'react';

import FormNewComponent from '../FormNewCompnetn/FormNewComponent'
import MyModal from '../MyModal/MyModal'
import GoogleIcon from '../GoogleIcon/GoogleIcon';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Button } from '@mui/material';

import axios from 'axios';
import { url } from '../../../config/config';

import { show_modal } from '../../../redux/actions';
import { useDispatch } from 'react-redux';

import './CardOtherProduct.css'

export default function CardOtherProduct(props) {

   let dispatch = useDispatch()
   
   let {data,idGroup,setOtherProducts}=props
   
   const [openForm, setopenForm]=useState(false)
   const [anchorEl, setAnchorEl]=useState(null)
   
   const open = Boolean(anchorEl)
   
   const redactionComponent = ()=>{
      setopenForm(true)
   }

   const removeComponent =  ()=>{
      let idRemove = data.id
      axios.delete(`${url}otherorder/removecomponent?idGroup=${idGroup}&idRemove=${idRemove}`)
      .then((result)=>{
            if(result.data==`ok`){
               axios.post(`${url}otherorder`).then(res=>setOtherProducts(res.data)) 
            }          
         }             
      )
     
   }

   const addBaasket = ()=>{
      
      let dataOrder={
         name:data.name,
         src:data.src,
         units:data.units
      }
      dispatch(show_modal(dataOrder))
   }
  

  return (
    <div className='addPerformer addComponent'>
      <div className="cardimg">
         <img src={data.src} alt="" />
      </div>
      <div className='infoComponent'>
         <span className={data.name.length>25?`fontSizeMin`:``}>
            {data.name}
         </span>
         <br />
         <span onClick={addBaasket} className="addbutton" >
            Добавить в заказ
         </span>
      </div>
      <div  onClick={(e)=>setAnchorEl(e.currentTarget)}>
         <GoogleIcon icon={`menu`}/>
      </div>
         <Menu
         anchorEl={anchorEl}
         open={open}
         onClose={()=>setAnchorEl(null)}>
            <MenuItem onClick={redactionComponent}>
               изменить
            </MenuItem>
            <MenuItem onClick={removeComponent}>
                удалить
            </MenuItem>
         </Menu>       
      <FormNewComponent 
       openForm={openForm} 
       redaction={true}
       setOpenForm={setopenForm}
       idGroup={idGroup}
       name={data.name}
       units={data.units}
       src={data.src}
       setOtherProducts={setOtherProducts}/>
       <MyModal/>
    </div>
  )
}
