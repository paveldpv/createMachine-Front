import React from 'react'
import { NavLink } from 'react-router-dom'

import GoogleIcon from '../../component/additional/GoogleIcon/GoogleIcon'
//=======style=======//
import "./Nav.css"





export default function Nav() {
  

  return (
   <nav className='navigator'>

     <div className='navlink'>
        <NavLink to="/Counterparty">
          <span>
            <GoogleIcon icon={`group`}/>
            <span className='navText'>Исполнители</span>
          </span>
        </NavLink>
     </div>

     <div className="navlink">
         <NavLink to="/DrawingCatalog">
           <span>
           <GoogleIcon icon = {`perm_data_setting`}/>
            <span className='navText'>Детали</span>
            </span>
         </NavLink>
     </div>
     
     <div className="navlink">
         <NavLink to="/Order">
           <span>
           <GoogleIcon icon = {`list_alt`}/>
            <span className='navText'>Заказы</span>
            </span>
         </NavLink>
     </div>     
     
     <div className="navlink">
        <NavLink to="/otherorder">
          <span>
          <GoogleIcon icon = {`extension`}/>
            <span className='navText'>Прочие комплектующие</span>
            </span>
        </NavLink>
     </div>
    

     <div className="navlink">
         <NavLink to="/Analystics">         
           <span>
            <GoogleIcon icon = {`legend_toggle`}/>
            <span className='navText'>Анатика</span>
            </span>
         </NavLink>
     </div>
     
     <div className="navlink">
         <NavLink to="Debts">
           <span>
           <GoogleIcon icon = {`account_balance_wallet`}/>
            <span className='navText'>Учет</span>
            </span>
         </NavLink>
     </div>
     
     <div className="navlink">
         <NavLink to="/About">
           <span>
           <GoogleIcon icon = {`help`}/>
            <span className='navText'>О приложении</span>
            </span>
          </NavLink>
     </div>
   
   </nav>
  )
}
