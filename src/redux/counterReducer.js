import { SHOW_MODAL, HIDE_MODAL } from './typesAction';



const initialmodal = {
   modal: false,
   nameDrawing : ``
}

export const counterReducer = (state = initialmodal, action) => {
   switch (action.type) {
      case SHOW_MODAL:
         return { ...state,modal:true ,nameDrawing:action.payload}
         break;
      case HIDE_MODAL:
         return { ...state, modal:false,nameDrawing:``}
         break;
      default:
         return state
         break;
   }

}