import React from 'react'
//=======import Componets=======//
import ListNumberDetail from '../../component/ListNumberDetail/ListNumberDetail';
import DrawingSB from '../../component/DrawingSB/DrawingSB'
//=======import MUI=======//
import Grid from '@mui/material/Grid';
//=======import redux=======//
import {useSelector,useDispatch} from 'react-redux'

export default function SBdrawing() {
  
  const dataDrawing = useSelector(state=>state.sbDrawing.dataSBDrwaing)
  
  let path           = dataDrawing[1].path
  let drawingCatalog = dataDrawing[0].data
  let sbArray        = drawingCatalog.filter(detail=>/СБ/.test(detail.name))
  let numberArray    = drawingCatalog.filter(detail=>!(/СБ/.test(detail.name)))
  
  
  return (
    <div className='box'>
      <Grid container spacing={2} >
        <DrawingSB detail={sbArray}/>
        <ListNumberDetail detail={numberArray} path={path}/>
      </Grid>
      
    </div>
  )
}
