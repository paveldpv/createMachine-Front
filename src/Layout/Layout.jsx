import React from 'react'
import { Outlet } from 'react-router-dom'
//=======import Componets=======//
import Nav from '../container/NAV/Nav'
import Header from '../container/HEADER/Header'




export default function Layout() {
   return (
      <div className='gridContainer'>
         <Header/>
        
         <Nav />
         
         <div className='outlet'>
         <Outlet />         
         </div>
      </div>
   )
}
