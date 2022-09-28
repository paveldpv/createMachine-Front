import React from 'react'
import { useState } from 'react';
import axios from 'axios'
import {url} from './../../config/config'

import {CSSTransition, TransitionGroup,} from 'react-transition-group';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';
import Tooltip from '@mui/material/Tooltip';

import GoogleIcon from '../additional/GoogleIcon/GoogleIcon';
import FormNewComponent from '../additional/FormNewCompnetn/FormNewComponent';
import CardOtherProduct from '../additional/CardOtherProduct/CardOtherProduct';


import './GroupOtherProduct.css'

export default function GproupOtherProduct(props) {
   let {setOtherProducts,group}=props
 
   const [expanded, setExpanded] =useState(false)
   const [openForm,setOpenForm]=useState(false)

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

   const renameGroup =(e)=>{
      let idGroup = group.keyGroup
      
      
   }
   const addNewComponent =()=>{
      setOpenForm(true)
   }
   const removeGroup =(e)=>{
      let idGroup = group.keyGroup
      console.log(idGroup);
      axios.delete(`${url}otherorder/removegroup?id=${idGroup}`)
      .then(axios.post(`${url}otherorder`)
         .then(res=>setOtherProducts(res.data)))
   }

  return (
    <div className='debts'>
       <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
       style={{backgroundColor:`#32353b`,color:`#fedfaa`}}>
         <AccordionSummary        
          expandIcon={<ExpandMoreIcon style={{color:`#fedfaa`}}/>}
          aria-controls="panel1bh-content"
          id="panel1bh-header">          
            <div className="groupName">
               <span className='titleAccordion'>{group.nameGroup}</span>
               <Tooltip title="удалить группу">
                  <span onClick={removeGroup}>
                     <GoogleIcon icon={`delete`} color={`#fedfaa`} />
                  </span>
               </Tooltip >
               <Tooltip title='изменить имя'>
                  <span  onClick={renameGroup}>
                     <GoogleIcon icon={`edit`} color={`#fedfaa`} />
                  </span>
               </Tooltip>
            </div>  
        </AccordionSummary>         
         <AccordionDetails>
         <hr />
            <TransitionGroup className='component'>
               <span className='addPerformer addComponent'
               onClick={addNewComponent}>
                  <span>
                     Добавить деталь
                     <GoogleIcon icon={`add`} />
                  </span>
               </span>               
                  {group.data.map(product=><CSSTransition key={product.id} timeout={500} classNames="item">
                     <CardOtherProduct data={product}
                     idGroup={group.keyGroup}
                     setOtherProducts={setOtherProducts}
                     key={product.id}/>
                  </CSSTransition>)}              
            </TransitionGroup>
         </AccordionDetails>
       </Accordion>
       <FormNewComponent
        setOtherProducts={setOtherProducts} 
        openForm={openForm} 
        idGroup={group.keyGroup}
        setOpenForm={setOpenForm}/>
    </div>
  )
}
