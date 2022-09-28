import { AXIOS_ORDER } from "./typesAction";

import axios from 'axios'
import { url } from "../config/config";

const initialOrder ={
   order:[]
}
//axios.post(url+`order`).then(res=>initialOrder.order=res.data)

export const axiosOrder = (state=initialOrder,action)=>{
   
   switch (action.type) {      
      case AXIOS_ORDER:           
         return{...state,order:action.payload}
         break;   
      default:
        
         return state
         break;
   }
}