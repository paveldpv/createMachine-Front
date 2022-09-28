import React, { useEffect, useState } from 'react'
//=======import style=======//
import './Basket.css'
//=======import componetn=======//
import MyModalBasket from '../additional/MyModalBasket/MyModalBasket'
import GoogleIcon from '../additional/GoogleIcon/GoogleIcon';

import {  useDispatch,useSelector } from 'react-redux'

import { open_basket} from '../../redux/actions'




export default function Basket() {

  let dispatch = useDispatch()  
  const [amountOrder,setAmountOrder] = useState()
  

  return (
    <>
      <div className={amountOrder>0?`Basket amountOrder`:`Basket`}
       onClick={()=>dispatch(open_basket())}
       dataamount={amountOrder}>
        <GoogleIcon icon={`architecture`} />
        <span>заказ</span>
      </div>
      
      <MyModalBasket setAmountOrder={setAmountOrder} />
    </>
  )
}
