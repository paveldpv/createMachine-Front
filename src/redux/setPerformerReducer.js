import { SET_PERFORMER,CHANGE_PERFORMER,CHANGE_URGENT,REMOVE_ORDER} from "./typesAction";

const initialPerformer = {
   orderPerformer : []
}

export const setPerformer = (state=initialPerformer,action)=>{
   switch (action.type) {
      case SET_PERFORMER:
         console.log(`set performer`);
         if(state.orderPerformer.length==0){
            return{...state, orderPerformer:[...state.orderPerformer,action.payload]}
         }
         else{
            console.log(state.orderPerformer.find(order=>order.id==action.payload.id));
           if(!state.orderPerformer.find(order=>order.id==action.payload.id)){
            console.log(`push`);
            return{...state, orderPerformer:[...state.orderPerformer,action.payload]}  
           }
           else{
            return{...state, orderPerformer:[...state.orderPerformer]}  
           }
         }      
              
         break;   
      case CHANGE_PERFORMER:       
      
         console.log(action); 
         state.orderPerformer.forEach(order=>{
            if(order.id==action.payload.id){
               order.performer=action.payload.performer
            }
         })
         return{...state}
         break;
      case CHANGE_URGENT:         
         state.orderPerformer.forEach(order=>{
            if(order.id==action.payload.id){
               order.urgent=action.payload.urgent 
            }
         })
         return{...state}
         break;
      case REMOVE_ORDER:
         state.orderPerformer = state.orderPerformer.filter(detail=>detail.id!=action.payload) 
         return{...state}    
       break;
      default:
         return state
         break;
   }
}