import React from 'react'
//=======import MUI=======//
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button'
//=======import component=======//
import MyModal from '../additional/MyModal/MyModal';
import GoogleIcon from '../additional/GoogleIcon/GoogleIcon';
//=======import function=======//
import { getNumberAndName } from '../ImageList/ImageList'
//=======import redux=======//
import { useDispatch, useSelector } from 'react-redux'
import { sbDrawing, show_modal } from '../../redux/actions'

import './LIstNumberDetail.css'
import axios from 'axios';
import { url } from '../../config/config';

import moment from 'moment'

import SBdrawing from '../../pages/SBdrawing/SBdrawing';


export default function ListNumberDetail({ detail, path }) {

  let dispatch = useDispatch()

  const sortDrawing = (arr = []) => {
    return arr.sort((a, b) => {

      return parseInt(getNumberAndName(a.name).number) - parseInt(getNumberAndName(b.name).number)
    })
  }

  const rename = async (detail) => {
    const number = window.prompt(`введите номер чертежа из спецификации`)
    if (number != null && (Number.isFinite(+number))) {
      detail.addName = number
      console.log(detail);
      await axios.post(url + `rename`, { detail })
        .then(res => { console.log(res) })
        .catch(err => console.log(err))

      axios.get(`${url}exploer?path=${detail.path}`)
        .then(res => {          
          let dataSB = [{data:res.data.files},{path:path}]          
          dispatch(sbDrawing(dataSB))
        })//
    }
  }

  const changeAmount = (e) => {
    if (!e.altKey) {
      let dataDrawing = {
        name: e.target.getAttribute('data'),
        src: e.target.getAttribute('datasrc')
      }
      dispatch(show_modal(dataDrawing))
    }
    else {
      let reanemDrawing = {
        oldName: e.target.getAttribute('data'),
        path: path,
        date: moment().format(`L`)
      }
      rename(reanemDrawing)
    }

  }




  return (
    <Grid item container xs={4} gap={1} >
      <div className='listItem'>
        {sortDrawing(detail)
          .map(item => {
            return <span className='listNumber' key={item.name}>
              <Button variant="outlined" data={item.name} datasrc={item.src} onClick={changeAmount}
              >
                {getNumberAndName(item.name).number}
              </Button>
            </span>
          })}
      </div>
      <MyModal />
    </Grid>
  )
}
