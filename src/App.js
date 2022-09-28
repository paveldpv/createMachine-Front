import './App.css';
//=======react-router-dom=======//
import {  Route, Routes } from 'react-router-dom';
//=======import Componets=======//
import Counterparty from './pages/Counterparty/Counterparty';
import DrawingCatalog from './pages/DrawingCatalog/DrawingCatalog.jsx';
import Layout from './Layout/Layout';
import About from './pages/About/About'
import OtherOrder from './pages/OtherOrder/OtherOrder';
import SBdrawing from './pages/SBdrawing/SBdrawing';
import Order from './pages/Order/Order';
import Analystics from './pages/Analystics/Analystics'
import Debts from './pages/Debts/Debts';
import PriceCounterparty from './pages/PrciceCouterparty/PriceCouterparty'
import HistoryOrders from './pages/HistoryOrders/HistoryOrders';


function App() {
  return (
    <div className='root'>     
     <Routes>
        <Route path = '/' element                                        = {<Layout/>}>
        <Route path = "Counterparty" element                             = {<Counterparty />} />
        <Route path = "DrawingCatalog" element                           = {<DrawingCatalog />} />
        <Route path = "About" element                                    = {<About />} />
        <Route path = "otherorder" element                               = {<OtherOrder />} />
        <Route path = "SBdrawing" element                                = {<SBdrawing />} />
        <Route path = 'Order' element                                    = {<Order/>}/>
        <Route path = 'Analystics' element                               = {<Analystics/>}/>
        <Route path = 'Debts' element                                    = {<Debts/>}/>
        <Route path = 'Analystics/prciecouterparty/:couterparty' element = {<PriceCounterparty/>}/>
        <Route path = 'HistoryOrders' element                            = {<HistoryOrders/>}/>
        </Route>
      </Routes>     
    </div>
    
  );
}

export default App;
