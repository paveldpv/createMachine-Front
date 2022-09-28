import React, { useState } from 'react'
//=======import MUI=======//
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
//=======import componetn=======//
import MySlider from '../Myslider/MySlider';
import GoogleIcon from '../GoogleIcon/GoogleIcon';
//=======import redux=======//
import { useSelector, useDispatch } from 'react-redux'
import { hide_modal, add_basket } from '../../../redux/actions'
//=======import Style=======//
import './MyModal.css'
//=======import function=======//
import { getNumberAndName } from '../../ImageList/ImageList';

import uniqid from 'uniqid'
import {amountDetail} from './../../../redux/actions'


export default function MyModal() {  
  const stylesModal = {
    
    root: {
      backgroundColor: "transparent"
    },    
  };
  

  let dispatch = useDispatch()

  let modalOpen = useSelector(state => state.modal.modal)
  let modalName = useSelector(state => state.modal.nameDrawing.name)
  let amount    = useSelector(state => state.amount.amount)           // mayebe from select 
  let modalSrc  = useSelector(state => state.modal.nameDrawing.src)
  let units     = useSelector(state=>state.modal.nameDrawing.units||`шт`)
  

  const addOrder = () => {    
    let order = {
      amount: amount,
      name: modalName,
      src:modalSrc,
      id:uniqid(),
      units:units

    }
    dispatch(add_basket(order))
    dispatch(amountDetail(1))
    dispatch(hide_modal())
  }

  const cancel = () => {
    dispatch(hide_modal())
  }

  return (
    <>
      <Modal style={stylesModal}      
        open={modalOpen}>
        <div className='WindowsModal'>
          <div className='amount'>
            {amount} {units}
          </div>
           <span className='modalName'>
            {getNumberAndName(modalName).name}
          </span>
          <span className='modalNumber'>
            № СБ чертеже :  {getNumberAndName(modalName).number}
            <a href={modalSrc} target="_blank">
              <GoogleIcon icon={`image`}/>
            </a>
          </span>
          
          <MySlider />
          <Button variant="contained" onClick={addOrder} color="success" style={{ margin: 5 }}>
            добавить в заказ
          </Button>
          <Button variant="contained" onClick={cancel} color="error" style={{ margin: 5 }} >
            отмена
          </Button>
        </div>
      </Modal>
    </>
  )
}
