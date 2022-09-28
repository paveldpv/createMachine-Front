import React from 'react'
//=======import MUI=======//
import Grid from '@mui/material/Grid';
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem';

import ModalImage from "react-modal-image"


export default function DrawingSB({detail}) {
  
  

  return (
    <Grid container xs={8}  >
      <ImageList cols={2} gap={2} sx={{height:"auto"}}>       
      {detail.map(sbimage=>{
        return <ImageListItem key={sbimage.name} >
                    <ModalImage 
                    small={sbimage.src}
                    large={sbimage.src}
                    alt={sbimage.name}
                    showRotate={true}
                    hideDownload={true}
                  />;
               </ImageListItem>
      })} 
      </ImageList>        
    </Grid>
  )
}
