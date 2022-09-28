import { SB_DRAWING } from './typesAction';



const initialSBDrawing = {
   dataSBDrwaing  : []
}

export const sbDrawing = (state=initialSBDrawing,action)=>{
   switch (action.type) {
      case SB_DRAWING:
         return{...state,dataSBDrwaing:[...action.payload]}
         break;   
      default:
         return state
         break;
   }
}