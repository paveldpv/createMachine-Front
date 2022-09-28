import { SHOW_MODAL,
    HIDE_MODAL,
    SB_DRAWING,
    AMOUNT_DETAIL,
    ADD_BASKET,
    OPEN_BASKET,
    CLOSE_BASKET,
   SET_PERFORMER,
   AXIOS_ORDER,
   REMOVE_BASKET,
   CHANGE_PERFORMER,
   CHANGE_URGENT,
   REMOVE_ORDER
   } from "./typesAction";

import { url } from "../config/config";

import axios from 'axios';

export function show_modal(dataDrawing) {
   return {
      type: SHOW_MODAL,
      payload:dataDrawing

   }
}

export function hide_modal() {
   return {
      type: HIDE_MODAL,

   }
}

export function sbDrawing(data){
   return{
      type:SB_DRAWING,
      payload:data
   }
}

export function amountDetail (amount){
   return {
      type: AMOUNT_DETAIL,
      payload:amount
   }
}

export function add_basket (data){   
   return {
      type: ADD_BASKET,
      payload:data
   }
}

export function open_basket() {
   return {
      type: OPEN_BASKET,

   }
}

export function close_basket() {
   return {
      type: CLOSE_BASKET,

   }
}

export function setPerformer(data) {
   
   return {
      type: SET_PERFORMER,
      payload:data
   }
}

export function changePerformer(data){

   return{
      type:CHANGE_PERFORMER,
      payload:data
   }
}

export function changeUrgent(data){
   return{
      type:CHANGE_URGENT,
      payload:data
   }
}


export function postOrder(){
   return async dispatch =>{
      let response = await axios.post(url+`order`)
      console.log(`=============`);
      let order = await response.data
       dispatch({type:AXIOS_ORDER,payload:order})     
    
   }

}

export function remove_basket(id){
   return{
      type:REMOVE_BASKET,
      payload:id
   }
}

export function remove_order(id){
   return{
      type:REMOVE_ORDER,
      payload:id
   }
}

