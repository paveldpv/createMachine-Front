import React from "react";
import ReactDOM from "react-dom/client"
import './index.css';
import './media.css'
//=======import Componets=======//
import App from './App';
//=======import react-router-dom=======//
import {BrowserRouter} from 'react-router-dom'
//=======import redux=======//
import {createStore,compose,applyMiddleware} from 'redux'
import {rootReducer} from './redux/combineReducer';
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'

const store = createStore(rootReducer,compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

const root = ReactDOM.createRoot(document.getElementById("root"));
 root.render(
   <>
    <BrowserRouter>
      <Provider store={store}>
         <App />
      </Provider>
    </BrowserRouter> 
   </>
 );