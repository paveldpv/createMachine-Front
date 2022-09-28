import { ADD_BASKET,REMOVE_BASKET } from "./typesAction";

const initialBasket = {
   onBasket : []
}

export const basketReducer = (state=initialBasket,action)=>{
   switch (action.type) {
      case ADD_BASKET:    
              //если в стаейте есть элементы с именем из актиона то изменять количесвто в стайте     
         for (let i = 0; i <= state.onBasket.length; i++) {
            let element = state.onBasket[i]
            if(element && element.name == action.payload.name  ){
               element.amount +=action.payload.amount
               return{...state,onBasket:[...state.onBasket]}
            }
            else{
               return{...state,onBasket:[...state.onBasket,action.payload]}
            }
         }           
         break; 
      case REMOVE_BASKET:    
         console.log(state.onBasket);     
         state.onBasket = state.onBasket.filter(detail=>detail.id!=action.payload)    
         console.log(state.onBasket);      
         return{...state}  
      default:
         return state
         break;
   }
}