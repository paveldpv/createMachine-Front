import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { url } from '../../config/config'
import OrderList from './../../component/OrderList/OrderList'

import FilterTextField from '../../component/FilterTextField/FilterTextField'
import GoogleIcon from '../../component/additional/GoogleIcon/GoogleIcon'
import Loader from '../../component/additional/Loader/Loader'
import FilterHistoryOrder from '../../component/FilterHistoryOrder/FilterHistoryOrder'


export default function HistoryOrders() {

  const [loader,setLoader]=useState(true)
  const [historyOrders,setHisitoryOrders]=useState([])
  const [amountOrder, setAmountOrder] = useState(10)
  const [performers, setPerformers] = useState([])
  const [filterPerformers,setFilterPerformers]=useState([])
  //const [date, setDate] = useState(null)
  
  useEffect(()=>{
    axios.get(url+'performer').then(res=>setPerformers(res.data))
    let limits={
      limitStart:0,
      limitEnd:amountOrder
    }
    axios.post(url+`historyorder`,limits).then(res=>{   
      setHisitoryOrders(res.data.data)
      setLoader(false)      
    }).catch(err=>console.log(err))      
    
  },[])

 const changeAmountOrderOnPage=async(value)=>{
    setAmountOrder(value)
    setLoader(true)
    let params={
      limitStart:0,
      limitEnd:value,
      performersID:[]
    }
    let res = await axios.post(url+`historyorder`,params)
    setHisitoryOrders(res.data.data)
    setLoader(false)
 }

 const changePerformers =async (idPerformers,checked)=>{
  let arrPerformers = checked?[...filterPerformers,idPerformers]:filterPerformers.filter(id=>id!=idPerformers)
  setFilterPerformers(arrPerformers) 
  let params={
    limitStart:0,
    limitEnd:amountOrder,
    performersID:arrPerformers
  }
  console.log(params);
  setLoader(true)
  let res = await axios.post(url+`historyorder`,params)
  setHisitoryOrders(res.data.data)
  setLoader(false)

 }

  return (
    <div className='box'>
      <div className="search">
         <FilterTextField/>
      <NavLink to='/Order'>
         <span className='openSB'>
            <GoogleIcon icon={`undo`} color={`#fedfaa`}/>
            Назад
         </span>
      </NavLink>
      </div>
      <hr />
        <FilterHistoryOrder
         performers={performers}
         amountOrder={amountOrder}
         setAmountOrder={setAmountOrder}
         changeAmountOrderOnPage={changeAmountOrderOnPage}
         changePerformers={changePerformers}
          />
      <hr />
      <div className="headeOrder">
      <Loader opacity={loader}/>
        {historyOrders.map((order,index)=><OrderList key={order.id+index} order={order} history={true}/>)}
      </div>
      <span className='openSB'>Следующая страница</span>
    </div>
  )
}
