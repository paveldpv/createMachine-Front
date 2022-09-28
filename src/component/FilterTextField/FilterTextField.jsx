import React from 'react'
import TextField from '@mui/material/TextField'


export default function FilterTextField(props) {

   let {setSearch,titleSearch,value}=props
 

  return (
    <div>
      <TextField sx={{ width: 450 }}
          id="outlined-basic"
          label={titleSearch||`поиск`}
          variant="outlined"  
          onChange={(e)=>setSearch(e.target.value)}   
          value={value} 
        />
        
    </div>
  )
}
