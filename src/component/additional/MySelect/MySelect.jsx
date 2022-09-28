import React, { useEffect, useState } from 'react'
import moment from 'moment'


import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox'

import { useDispatch } from 'react-redux';
import { setPerformer,changePerformer,changeUrgent } from '../../../redux/actions';

import './MySelect.css'


export default function MySelect(props) {  
  
  const dispatch = useDispatch()
  const [value , setValue]=useState(props.defaultPerformer)  
  
  const currentOrder = { 
  role     : `admin`,
  id       : props.order.id,
  src      : props.order.src,
  date     : moment().format("L"),
  order    : props.order.name,
  amount   : props.order.amount,
  performer: props.defaultPerformer,
  urgent   : false,
  units    : props.order.units      
 } 
    
  useEffect(()=>{dispatch(setPerformer(currentOrder))},[])
    
  const handlerchangeUrgent = (e)=>{    
    console.log(e.target.checked);
    let urgent  =  e.target.checked;

    dispatch(changeUrgent({
      id:props.order.id,
      urgent:urgent 
    }))
  }
  
  const handleChangePerformer =(event)=>{   
    props.setInfoPerformer(event.target.value)   
    setValue(event.target.value)   

    dispatch(changePerformer({
      id:props.order.id,
     performer:event.target.value
    }))
    
        
  }

  return (
    <FormControl variant='outlined' >   
        <div className='checkbox'>
          Срочная деталь 
          <Checkbox size='large'          
          onChange={handlerchangeUrgent}
          />
        </div>
          <Select  
          defaultValue={value}
          onChange={handleChangePerformer}
          value={value}>
        {props.performers.map((performer,index)=>{
          return <MenuItem key={index} value={performer}>
                  {performer.name}
                  </MenuItem>
          })}         
        </Select>
    </FormControl>
  )
}
