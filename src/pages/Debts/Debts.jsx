import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import {url} from './../../config/config'

import PeopleDebts from '../../component/PeopleDebts/PeopleDebts'
import GoogleIcon from '../../component/additional/GoogleIcon/GoogleIcon'
import Loader from './../../component/additional/Loader/Loader'

import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

import './Debts.css'
// import {useSelector,useDispatch} from 'react-redux'

// import { debtsPost } from '../../redux/actions'

export default function Debts() {  
   const [loader,setLoader]=useState(true)
   const [debts,setDebts]=useState([])
   const [open, setOpen] = useState(false);
   const [input,setInput] = useState(``)
   
  
   useEffect(()=>{
      axios.post(url+`debts`)
      .then(res=>{
        setDebts(res.data)
        setLoader(false)
      })
      .catch(eror=>console.error(eror))
   },[])
  
   

   const addCounterparty = async ()=>{       
    if(!input.trim().length==0){      
     await axios.get(url+`debts?counterparty=${input}`)

     axios.post(url+`debts`)
     .then(res=>setDebts(res.data))
     .catch(eror=>console.error(eror))
      
    }
    setInput(``)
    setOpen(false)
   }
   
   const handleClose = () => setOpen(false)

  return (

    
    <div className='box'>
      <Loader opacity={loader}/>
      {debts.map((peopleDebts,index)=>{
        return <PeopleDebts dataDebts={peopleDebts} key={index} setDebts={setDebts}/>
      })}
      
        <div className='Basket add' onClick={()=>setOpen(true)}>
          <span>Добавить контрагента
          <GoogleIcon icon={`add`}/>
          </span>          
        </div>
        
        <Modal
        open={open}
        onClose={handleClose}>
          <div className='WindowsModal add'>
            <TextField label="Контрагент" variant="outlined"
             onChange={(e)=>setInput(e.target.value)} />
            <Button variant="contained" color="success" onClick={addCounterparty}>
              Создать
            </Button>
          </div>
        </Modal>
      
    </div>
  )
}
