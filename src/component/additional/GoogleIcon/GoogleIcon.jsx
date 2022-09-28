import React from 'react'

import './GoogleIcon.css'

export default function GoogleIcon(props) {
  
  return (
   <span className={!props.color||props.color==`#c62828`?`material-icons`:`material-icons toltipWhite`}
    datatoltip={props.toltip||``}
    data={props.data?props.data:``}
    style={{color:`${props.color}`}}
    >
    {props.icon}
    </span>
  )
}
