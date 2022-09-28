import React, { useState } from 'react'
import moment from 'moment'
import GoogleIcon from '../additional/GoogleIcon/GoogleIcon'

import './Time.css'
export default function Time() {
  const [time,setTime]=useState(moment().format(`HH:mm`))
  const [date,setDate]=useState(moment().format(`L`))

  setInterval(() => {
    setTime(moment().format(`HH:mm`))
  }, 60000);

  setInterval(() => {
    setDate(moment().format(`L`))
  }, 260000);

  return (
    <div className='time'>
      <span>
        <GoogleIcon icon={`schedule `}/>
        {time}
      </span>      
      <span>{date}</span>
    </div>
  )
}
