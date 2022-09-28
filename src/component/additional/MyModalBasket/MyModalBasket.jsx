import React, { useEffect, useState } from 'react'
//=======import MUI=======//
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import { useSelector, useDispatch } from 'react-redux'
import {CSSTransition, TransitionGroup,} from 'react-transition-group';

import { close_basket } from '../../../redux/actions';

import { url } from '../../../config/config';

import MyAccordion from '../MyAccordion/MyAccordion';

import axios from 'axios';

import './MyModalBasket.css'


export default function MyModalBasket(props) {

  const styles = {
    root: {
      backgroundColor: "transparent"
    },    
  };

  const [performers,setPerformets]= useState([])

  useEffect(()=>{
    axios.get(`${url}performer`).then(res=>setPerformets(res.data))    
  },[]) 
 

  let dispatch        = useDispatch()
  let modalOpen       = useSelector(state => state.openBasket.open) // добавленые из каталогов детали 
  let dataOrders      = useSelector(state => state.onBasket.onBasket)
  let orderPerformers = useSelector(state=>state.setPerformer)     //mySelect сфоримированый список заказов с исполнителями

  props.setAmountOrder(dataOrders.length)

  const defaultPerformer = (order={},performers=[])=>{
    let defaultPerformer =performers[0]
          performers.forEach(performer=>{            
           if(performer.keyWords){            
              let re = new RegExp(performer.keyWords)               
              if(re.test(order.name.toLowerCase())){
                defaultPerformer=performer                
              }                                
           }             
          })            
    return  defaultPerformer
  }
  

 
  const sendOrder =()=>{    
    if(orderPerformers.orderPerformer.length!=0){
      console.log(orderPerformers);   
        axios.post(`${url}sendorder`,orderPerformers)
      .then(res=>{
        console.log(res.data);
        window.location.reload()
      })
      .catch(err=>console.error(err))    
      dispatch(close_basket())
    }
    else{
      alert(`корзина пуста`)
      console.log(`not found order`);
    }
         
  }

  const cancel = () => {    
    dispatch(close_basket())   
  }

  return (
    
      <Modal open={modalOpen} style={styles} onClose={cancel} >
        <div className={dataOrders.length>3?"ModalBasket moreSix":"ModalBasket"}>
          
          <TransitionGroup className='GrooupAccordion'>
            {dataOrders.length==0 ? `в заказе пока ничего нет` :
            dataOrders.map(order=>{
               order.performer=defaultPerformer(order,performers)//добовляем свойство perfomer к каждому экземляру заказа
               return <CSSTransition key={order.name} timeout={500} classNames="item">
                        <MyAccordion order={order}
                                performers={performers}
                                key={order.name}
                                defaultPerformer={defaultPerformer(order,performers)}/>
                      </CSSTransition>})}
          </TransitionGroup>
      
            <div className='groopButon'>
              <Button variant="contained" onClick={sendOrder} color="success" style={{ margin: 5 }}  >
                сделать заказ
              </Button>
              <Button variant="contained" onClick={cancel} color="error" style={{ margin: 5 }}>
                отмена
              </Button>
            </div>
      
        </div>
      </Modal>
    

  )
}
