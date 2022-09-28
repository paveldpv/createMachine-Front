import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionDetails from '@mui/material/AccordionDetails';

import DetailDebts from '../../component/additional/DetailDebts/DetailDebts'

import { useState } from 'react';

import './PeopleDebts.css'

export default function PeopleDebts(props) {

   let dataDebts = props.dataDebts
  
   const [expanded, setExpanded] =useState(false)

   const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className='debts'>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}
       style={{backgroundColor:`#32353b`,color:`#fedfaa`}}>
        <AccordionSummary        
          expandIcon={<ExpandMoreIcon style={{color:`#fedfaa`}}/>}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >          
            <span className='titleAccordion'>{dataDebts.people}</span>          
        </AccordionSummary>        
        <AccordionDetails>
          <div className='headerDebts'>
            <span>деталь</span>
            <span>дата</span>
            <span>цена</span>
            <span>исполнитель</span>            
          </div>
          <hr /> 
          <DetailDebts data={dataDebts.dataDebts} people={dataDebts.people} setDebts={props.setDebts}/>                   
        </AccordionDetails>
        
      </Accordion>
    </div>
  )
}
