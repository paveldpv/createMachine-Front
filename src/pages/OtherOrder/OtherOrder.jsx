import React, { useEffect } from 'react'
import { useState } from 'react'
import {url} from './../../config/config'

import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import GoogleIcon from '../../component/additional/GoogleIcon/GoogleIcon'
import GproupOtherProduct from '../../component/GroupOtherProduct/GproupOtherProduct';
import Loader from './../../component/additional/Loader/Loader'

import uniqid from 'uniqid'
import axios from 'axios'

export default function OtherOrder() {

  const [otherPrdoducts,setOtherProducts] = useState([])
  const [open,setOpen]                    = useState(false)
  const [addGroupName ,setAddGroupName]   = useState(``)
  const [eror,setEror]                    = useState(false)
  const [showLoader,setShowLoader]        = useState(true)

  useEffect(()=>{
    axios.post(`${url}otherorder`).then(res=>{
      setShowLoader(false)
      setOtherProducts(res.data)})
  },[])

  const addGroup=()=>{
    if(addGroupName){
      let newGroup ={
        id:uniqid(addGroupName),
        name:addGroupName
      }
      axios.post(`${url}otherorder/addnewgrroup`,newGroup)
        .then(res=>{
          axios.post(`${url}otherorder`).then(res=>setOtherProducts(res.data))
          setOpen(false)
        })
        .catch(err=>console.log(err))
    }
    else{
      setEror(true)
      setTimeout(() => {
        setEror(false)
      }, 2000);
    }
  }
  

  return (
    <div className='box'>  
    <Loader opacity={showLoader}/>   
      <div className='addPerformer addGroup'>
        <span onClick={()=>setOpen(true)}>
          Добавить группу
          <GoogleIcon icon={`add`} color={`#fedfaa`}/>      
          </span>
      </div>
      <hr/>
    {otherPrdoducts.map((group)=>{
      return(<GproupOtherProduct setOtherProducts={setOtherProducts} group={group} key={group.keyGroup}/>)
    })}


      <Modal 
      open={open}
      onClose={()=>setOpen(false)}
      >
      <div className='WindowsModal add'>
      <TextField label="назавание" variant="outlined" error={eror}
       onChange={(e)=>setAddGroupName(e.target.value)}/>
      <Button variant="contained" color="success" onClick={addGroup}>
          Добавить группу
       </Button>
      </div>
     </Modal>
    </div>
  )
}
