import React from 'react'
import ControlIcon from './../../component/additional/ControlIcon/ControlIcon'


export default function ControlPanelOrder({removeOrder,urgentOrder,setOpen,order}) {
  
  return (
   <ul className='listIcon'>
      <li onClick={removeOrder} >              
      <ControlIcon title={`удалить/заказ пришел`} icon={`delete`} color={order.urgent?`#c62828`:``} />
      </li>            
      <li onClick={urgentOrder} >                 
         {!order.urgent&&
         <ControlIcon title={'изменить приоритет'} icon={`priority_high`}/>}    
      </li>
      <li onClick={()=>setOpen(true)}>
      {order.amount>1 &&
         <ControlIcon title={`подтвердить часть заказа`} icon={`delete_sweep `} color={order.urgent?`#c62828`:``}/>}
      </li>
 </ul>
  )
}
