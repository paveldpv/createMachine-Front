import { AMOUNT_DETAIL } from "./typesAction";

const initialAmountDetail = {
   amount : 1
}

export const amountDetailReducer = (state=initialAmountDetail,action)=>{
   switch (action.type) {
      case AMOUNT_DETAIL:
         return{...state,amount:action.payload}
         break;   
      default:
         return state
         break;
   }
}