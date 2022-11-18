import React from 'react'

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import './FilterHistoryOrder.css'

let amountOrderOnPage =['10','20','30','40','50']
export default function FilterHistoryOrder({amountOrder,setAmountOrder,performers,changeAmountOrderOnPage,changePerformers}) {
  return (
   <div className='filter'>
          <div className='filterSelect'>
            <span>кол-во записей</span>
            <Select
            value={amountOrder}
            onChange={(e)=>changeAmountOrderOnPage(e.target.value)}
            >
              {amountOrderOnPage.map(value=><MenuItem key={value} value={value}>{value}</MenuItem>)}
            </Select>
          </div>
            <div className='filterSelect' >
            <span>фильтр по контрагентам</span>
              <div className='filterPerformer'>
                  {performers.map(performer=>{
                  return(
                      <FormControlLabel onChange={(e)=>changePerformers(performer.id,e.target.checked)}
                       key={performer.id} control={<Checkbox/>} label={performer.name}/>
                  )
                  })}
              </div>
            </div>
          <div>
         
          </div>
        </div>
  )
}
