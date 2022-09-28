import React, { useState } from 'react'
import './DetailDebts.css'
import InputDebt from '../InputDebt/InputDebt'
import GoogleIcon from '../GoogleIcon/GoogleIcon'
import MyModalEditDebt from '../MyModalEditDebt/MyModalEditDebt'

export default function AccorionDebts(props) {  

  const [detailDebt,setDetailDebts] = useState({})
  const [openModalEditDebt ,setOpenModalEditDebt] = useState(false)

  let totalPrice = props.data.reduce((a,b)=>{
    return Number(a)+Number(b.price)
   },0)
  
   const editDept =(e)=>{
    let detail = e.target.parentNode.getAttribute(`data`)
    setDetailDebts(JSON.parse(detail))
    setOpenModalEditDebt(true)
   }


  return (
    <div >
      {props.data.map((debstDetails,index)=>{
      return <div key={index} className={debstDetails.price<0?`headerDebts elements coming`:`headerDebts elements`}>
              <span>{debstDetails.product}</span>
              <span>{debstDetails.date}</span>
              <span>
                {debstDetails.price}
                </span>
              <span>{debstDetails.senderId}</span>
              <span data={JSON.stringify(debstDetails)} onClick={editDept}>
                <GoogleIcon icon={`edit`} color={`#fedfaa`} toltip={`Изменить`}/>
              </span>                       
             </div>
    })}
    <hr />
    <InputDebt people={props.people} setDebts={props.setDebts}/>
    <div className={totalPrice<0?`totalPrcie coming`:`totalPrcie`}>
      <span >
        итог : {totalPrice>=0?`мы должны`:`нам должны`} 
      </span>
      <span>{Math.abs(totalPrice)} Р</span>
    </div>
    <MyModalEditDebt 
    open    = {openModalEditDebt}
    setOpen = {setOpenModalEditDebt}
    product = {detailDebt.product}
    price   = {detailDebt.price}
    id      = {detailDebt.currentId}
    type    = {`editdebt`}
    people  = {props.people}
    setData = {props.setDebts}
     />
    </div>
  )
}
