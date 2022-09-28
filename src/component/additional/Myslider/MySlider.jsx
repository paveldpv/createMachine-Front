import React from 'react'

import Slider from '@mui/material/Slider';

import { useState } from 'react';

import '../Myslider/MySlider.css'

import {useDispatch} from 'react-redux'
import {amountDetail} from '../../../redux/actions'

export default function MySlider() {
  
  let dispathc = useDispatch()
  
  const setAmount = (e)=>{    
  dispathc(amountDetail(e.target.value))
  }

 return (
   <div className='slider'>
   <Slider style = {{ color:'#32353b'}}
    step={1} 
    aria-label="Temperature"
    defaultValue={1}    
    valueLabelDisplay="auto"
    marks
    min={1}
    max={30} 
    onChange={setAmount}
    />
    
   </div>
 )
  
}
