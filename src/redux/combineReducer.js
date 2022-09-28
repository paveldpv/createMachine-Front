import { combineReducers} from 'redux'
//=======import reducers=======//
import { counterReducer } from './counterReducer'
import { sbDrawing } from './sbDrawingReducer'
import { amountDetailReducer } from './amountDetailReducer'
import { basketReducer } from './basketReducer' 
import { openBasketReducer } from './openCloseBasketReducer'
import { setPerformer } from './setPerformerReducer'
import { axiosOrder } from './axiosOrder'






export const rootReducer = combineReducers({
   modal    : counterReducer,
   sbDrawing: sbDrawing,
   amount:amountDetailReducer,
   onBasket:basketReducer,
   openBasket : openBasketReducer,
   setPerformer:setPerformer,
   axiosOrder:axiosOrder,
   


    
})