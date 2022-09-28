import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import {  useParams } from "react-router-dom"
import { url } from '../../config/config'
import moment from 'moment'
import GoogleIcon from '../../component/additional/GoogleIcon/GoogleIcon'
import TextField from '@mui/material/TextField'
import {searchFilter} from './../../function/searchFiltertoNumber'
import PersonalPrice from '../../component/PersonalPrice/PersonalPrice'

import './PriceCounterparty.css'

export default function PriceCouterparty() {
  let paramsUrl = useParams()
  let couterparty = {
    date:moment().format(`L`),
      nameCounterparty :paramsUrl.couterparty,
      role:`admin`
  }


  const [dataPrice ,setdataPrcie] = useState([])
  const [filter,setFilter]        = useState(``)

  useEffect(()=>{
    axios.post(url+`analystic/getprice`,couterparty).then(res=>{
      console.log(res.data);
      setdataPrcie(res.data)
    })
  },[])


  return (
    <div className='box'>
      <div className='outlinenav'>
        {/* строка поиска               */}
        <TextField sx={{ width: 450 }}
          id="outlined-basic"
          label="поиск по номеру чертежа"
          variant="outlined"  
          onChange={(e)=>{
            console.log(e.target.value);
            setFilter(e.target.value)}}       
        />
        {/* кнопка назад */}
        { <a href='/Analystics'>
          <GoogleIcon icon={`undo`} />
          назад
        </a>}
      </div>
      <hr />
       <ul className='listPrice title'>
        <li>
          <GoogleIcon icon={`format_list_numbered_rtl `}/>
        </li>
        <li>
        <GoogleIcon icon = {`perm_data_setting`}/>  номер чертежа
          </li>
        <li>
          <GoogleIcon icon={`payments`}/>цена
          </li>
        <li>
         <GoogleIcon icon={`event`}/> дата последнего изменения
          </li>
        <li>
         <GoogleIcon icon={`image`}/> чертеж
          </li>
       </ul>   
      <hr />
      {searchFilter(dataPrice,filter,`number`).map((element,index)=>{
        return <div key={element.id}>
            <PersonalPrice detail={element} index={index}/>
            </div>
      })}
    </div>
  )
}
