import React from 'react'
import Tooltip from '@mui/material/Tooltip';
import GoogleIcon from '../../additional/GoogleIcon/GoogleIcon'

export default function ControlIcon(props) {
   let {title,icon,color,urgent}=props

  return (
   <Tooltip title={title} arrow>
      <div>
      <GoogleIcon icon={icon}
         color={color}/>
      </div>
   </Tooltip>
  )
}
