import { OPEN_BASKET,CLOSE_BASKET } from "./typesAction";

const openBasket = {
   open : false
}

export const openBasketReducer = (state=openBasket,action)=>{
   switch (action.type) {
      case OPEN_BASKET:         
         return{...state,open:true}
         break;   
      case CLOSE_BASKET:         
         return{...state,open:false}
         break; 
      default:
         return state
         break;
   }
}