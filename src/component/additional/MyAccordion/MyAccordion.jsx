import React,{useState} from 'react'

import {Lightbox} from "react-modal-image"

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Tooltip from '@mui/material/Tooltip';

import MySelect from '../MySelect/MySelect';
import GoogleIcon from '../GoogleIcon/GoogleIcon';

import {getNumberAndName} from '../../../function/getNameOrNumber'


import {  useDispatch } from 'react-redux'

import { remove_order,remove_basket } from '../../../redux/actions';

import './MyAccordion.css'


export default function MyAccordion(props) {
   
   let dispatch     = useDispatch()
   
   let defaultPerformer = props.defaultPerformer
   let order            = props.order
   let performers       = props.performers

   const [expanded, setExpanded]           = useState(false);
   const [infoPerformer ,setInfoPerformer] = useState(defaultPerformer||``)
   const [openImage,setOpenImage]          = useState(false)

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      
   };

   const removeOrder = (e)=>{
      let idRemove = props.order.id
      dispatch(remove_basket(idRemove))
      dispatch(remove_order(idRemove))
   }

   return (
      <div className='MyAccordion'>
         <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} >
            <AccordionSummary
               expandIcon={<ExpandMoreIcon />}
               id="panel1bh-header" >               
                  <div className="AccordionText">
                     <div>
                        {getNumberAndName(order.name).name}
                     </div>                     
                     <div >
                     Количество в заказе : {order.amount} {order.units}
                     </div>
                     
                  </div>
                                
            </AccordionSummary>
           
            <AccordionDetails>
               <hr />
               <div className="detailOrder">
                  <MySelect
                   performers={performers}
                   defaultPerformer = {defaultPerformer}
                   order={order}
                   setInfoPerformer={setInfoPerformer}
                   
                   />
                  <div className="infoPerformer">
                     <div>{infoPerformer.name?`Информация об исполнителе :`:`исполнитель не назначен`}</div>                     
                     <div>{infoPerformer.name}</div>
                     <div>{infoPerformer.email}</div>
                     <div>{infoPerformer.phone}</div>
                     {/* <div>{performer.price}</div> */}
                  </div>                   
                  <span>
                     {openImage &&(
                        <Lightbox
                        large={props.order.src}
                        onClose={()=>setOpenImage(false)}/>
                     )}

                     <Tooltip title={"показать чертеж"}>
                        <span onClick={()=>setOpenImage(true)}>
                           <GoogleIcon icon={`image`}/>
                        </span>
                     </Tooltip>  

                     <Tooltip title={"удалить заказ"}>
                        <span  onClick={removeOrder}>
                           <GoogleIcon icon={`delete`}/>
                        </span>
                     </Tooltip>
                  </span>
               </div>
         </AccordionDetails>
        </Accordion>
      </div>
   )
}
