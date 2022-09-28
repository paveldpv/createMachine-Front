import React from 'react'

import './Loader.css'

export default function Loader(props) {
   let opacity = props.opacity||false?`block`:`none`

  return (
    <div  className='loader' style={{display:`${opacity}`}}>
      <span data-text='&nbsp;РСПК&nbsp;'>
         &nbsp;РСПК&nbsp;
      </span>
    </div>
  )
}
