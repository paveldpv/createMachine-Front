import React from 'react'
//=======import Componets=======//
import Basket from '../../component/Basket/Basket'
import Logo from '../../component/Logo/Logo'
import Time from '../../component/Time/Time'
//=======import style=======//
import './Header.css'

export default function Header() {
  return (
    <>
      <div className='header'>
        <Time/>
        <Logo/>   
        <Basket/>
      </div>
    </>
  )
}
