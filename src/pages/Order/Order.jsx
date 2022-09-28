import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'

import {CSSTransition, TransitionGroup} from 'react-transition-group';
import { NavLink } from 'react-router-dom'

import { url } from '../../config/config'

import OrderList from '../../component/OrderList/OrderList'
import GoogleIcon from '../../component/additional/GoogleIcon/GoogleIcon'
import Loader from '../../component/additional/Loader/Loader'
import FilterTextField from '../../component/FilterTextField/FilterTextField';

import './Order.css'
import { searchFilter } from '../../function/searchFiltertoNumber';

export default function Order() {  

  const [loader,setLoader]             = useState(true)
  const [orders ,setOrders]            = useState([])
  const [filter,setFilter]             = useState(null)
  const [up,setUp]                     = useState(false)
  const [selectFilter,setSelectFilter] = useState({
    selectAmount   : {ascending:false,current:false},
    selectDate     : {ascending:false,current:false},
    selectPerformer: {ascending:false,current:false}
  })
  const [search,setSearch]=useState(``)

  

  useEffect(()=>{
    axios.post(url+`order`).then(res=>{      
      setOrders(res.data)
      setLoader(false)      
    })       
  },[])
 
  
  const filterOrder=(e)=>{    
    if(e.target.classList.contains(`material-icons`)){
     let changeFilter = e.target.getAttribute(`data`)  ;
      setFilter(changeFilter)  
      
      switch (changeFilter) {
        case `amount`:          
         setUp(prev=>!prev)
         setSelectFilter(prev=>({...prev,selectAmount:{ascending:!prev.selectAmount.ascending}}))         
          setSelectFilter(prev=>({...prev,
            selectAmount:{ascending:prev.selectAmount.ascending,current:true},
            selectDate:{ascending:false,current:false},
            selectPerformer:{ascending:false,current:false},
          }))
          break;

        case `date`:
          setUp(prev=>!prev)
          setSelectFilter(prev=>({...prev,selectDate:{ascending:!prev.selectDate.ascending}}))  
          setSelectFilter(prev=>({...prev,
            selectAmount:{ascending:false,current:false},
            selectDate:{ascending:prev.selectDate.ascending,current:true},
            selectPerformer:{ascending:false,current:false},
          }))
          break;

        case `performer`:
          setUp(prev=>!prev)
          setSelectFilter(prev=>({...prev,selectPerformer:{ascending:!prev.selectPerformer.ascending}}))
          setSelectFilter(prev=>({...prev,
            selectAmount:{ascending:false,current:false},
            selectDate:{ascending:false,current:false},
            selectPerformer:{ascending:prev.selectPerformer.ascending,current:true},
          }))
          break;      
      }

    }
  }

  

  const sortOrder=(arr=[],triger=``,up=false)=>{  
      switch (triger) {
        case `amount`:          
          arr.sort((firstOrder,secondOrder)=>firstOrder[triger]-secondOrder[triger]) 
          if(up)arr.reverse()          
          break    
        case`performer`:         
          arr.sort((firstOrder,secondOrder)=>firstOrder[triger].name>secondOrder[triger].name?-1:1)
          if(up)arr.reverse()  
          break
        case`date`:
          arr.sort((firstOrder,secondOrder)=>firstOrder[triger]>secondOrder[triger]?-1:1)
          if(up)arr.reverse()  
          break
      }
      
    return arr
    
  }

  return (
    <div className='box'>  
    <div className='search'>
      <FilterTextField setSearch={setSearch} titleSearch={`поиск по названию`}/>
      <NavLink to='/HistoryOrders'>
        <span className='openSB'>Посмотеть историю заказов</span>
       </NavLink>
    </div>
      <Loader opacity={loader}/>
      <div className='headerOrder'>
        <ul className='listOrder head' onClick={filterOrder}>
          <li>чертеж</li> 
          <li>наименование детали</li>          
          <li>
            <span>
             количество
            <GoogleIcon icon={selectFilter.selectAmount.ascending?`south`:`north`} 
            color={selectFilter.selectAmount.current?`#c62828`:``} data={`amount`}/>
            </span>
          </li>
          <li>
            <span>
               дата заказа
               <GoogleIcon icon={selectFilter.selectDate.ascending?`south`:`north`} 
               color={selectFilter.selectDate.current?`#c62828`:``} data={`date`}/>
            </span>
            </li>
          <li>
            <span>
              исполнитель
              <GoogleIcon icon={selectFilter.selectPerformer.ascending?`south`:`north`} 
              color={selectFilter.selectPerformer.current?`#c62828`:``} data={`performer`}/>
            </span>
          </li>
          <li><span>редактирование</span></li>
        </ul>
      </div>
      <hr />
      <TransitionGroup className='GrooupAccordion'>
        {searchFilter(sortOrder(orders,filter,up),search,`order`).map((order,index)=>{
          return <CSSTransition timeout={500} classNames="item" key={index}>                    
                      <OrderList 
                      order={order} 
                      setOrder={setOrders}/>                                     
                </CSSTransition>
        })}
      </TransitionGroup>
      
     
      
    </div>
  )
}
