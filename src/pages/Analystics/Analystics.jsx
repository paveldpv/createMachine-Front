import React from 'react'
import Counterparty from '../../component/Counterparty/Counterparty'

import './Analystics.css'

export default function Analystics() { 
  

  return (
    <div className='box'>
      <div className='wrapper'>
       <Counterparty/>
        <div className="statistic border">
          <span className="title">статистика</span>
        </div>
      </div>
    </div>
  )
}
