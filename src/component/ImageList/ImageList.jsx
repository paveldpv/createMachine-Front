import React, { useState } from 'react'
//=======import MUI=======//

import Grid from '@mui/material/Grid';
import CardHeader from '@mui/material/CardHeader';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
//=======import modal image=======//
import ModalImage from "react-modal-image"
//=======import axios=======//
import axios from 'axios'
//=======import componetn=======//
import GoogleIcon from '../additional/GoogleIcon/GoogleIcon';
import MyModal from '../additional/MyModal/MyModal';
//=======react-router-dom=======//
import { NavLink } from 'react-router-dom'
//=======import Style=======//
import './ImageList.css'
//=======import redux=======//
import {useDispatch} from 'react-redux'
import {show_modal,sbDrawing} from '../../redux/actions'


export const getNumberAndName =(str=``)=>{

  if(/!/.test(str)){

    let [number,name]= str.split(`!`)

    return {
      number:number,
      name: name
     }
  }
  return{
    number:str,
    name: str
  }

}
  

export default function ImalgeList({data,path}) { 
  
  let dispatch = useDispatch()

  const changeAmount = (e)=>{
    
    let dataDrawing={
      name:e.target.getAttribute('data'),
      src:e.target.getAttribute('datasrc')
    }
    dispatch(show_modal(dataDrawing))
     
      
  }

  const openSBdrawing =()=>{  
   let dataSB = [{data:data},{path:path}]     
    dispatch(sbDrawing(dataSB))
  }
  // 
  return(
  <>
      <NavLink to = "/SBdrawing">
        <span className="openSB" onClick={openSBdrawing}>
          Открыть сборочный чертеж
        </span>
      </NavLink>
    
        <Grid container gap={2} spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} >
          {data.map((drawingItem,index)=>{
            if(!/СБ/.test(drawingItem.name))
            return <Grid item container key={index} sx={{ maxWidth: 245}}
                     display='flex' direction="column" justifyContent='space-between'  alignItems='center'>
                    <CardHeader 
                      avatar={<GoogleIcon icon = {`perm_data_setting`}/>}
                      title={getNumberAndName(drawingItem.name).name}
                    />
                                    
                    <ModalImage
                      small={drawingItem.src}
                      large={drawingItem.src}
                      alt={!drawingItem.hasOwnProperty("sizeBearing")
                      ?
                      `${path}/${drawingItem.name} номер чертежа ${getNumberAndName(drawingItem.name).number}`
                      :
                     `${getNumberAndName(drawingItem.name).name}
                      внешний диаметр ${drawingItem.sizeBearing.externalDiametr}
                      внутрений диаметр ${drawingItem.sizeBearing.innerDiametr}
                      высота ${drawingItem.sizeBearing.height}
                      всего в данном узле ${drawingItem.amount} шт
                     `
                    }
                    />
                    <span className='MYUbutton'>                  
                      <Button variant="outlined" size='large'
                        onClick={changeAmount} 
                        data={drawingItem.name}
                        datasrc = {drawingItem.src}>
                        Добавить к заказу
                      </Button>
                    </span>
                  </Grid>
                  
      })}
          <MyModal/>
    </Grid>
    </>
  )
}
