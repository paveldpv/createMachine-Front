import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import { url } from '../../config/config'
import GoogleIcon from '../../component/additional/GoogleIcon/GoogleIcon'
import moment from 'moment'
import './Counterparty.css'

import { NavLink } from 'react-router-dom'

export default function Counterparty() {

   const [file, setFile] = useState([])
   const [analystic ,setAnalystic]=useState([])
   
   

  useEffect(()=>{
    axios.post(url+`analystic/couterparty`).then(res=>setAnalystic(res.data))
  },[])

  const uploadFiles =  (e)=>{
   console.log(`work upload`);
   e.preventDefault()
   if(e.target.files[0]){     
     setFile(e.target.files[0])
     console.log(e.target.files[0].name);
     
     
   }
  }

  const onSubmit = async (e)=>{
   
      e.preventDefault()
      let formData = new FormData();      
      formData.append('counterparty', file)     
      console.log(formData); 
      axios.post(url+`analystic/couterparty?add`,formData)
      .then(res =>console.log(res))
      .catch(err=>console.log(err))
      await axios.post(url+`analystic`).then(res=>setAnalystic(res.data))

  }


  

  return (
   <div className="price border">
      <span className="title">цены</span>
      {analystic.map(counterparty=>{
         return <NavLink to={`prciecouterparty/${counterparty.counterparty}`}>
               <div className='Button' 
                  data={counterparty.counterparty}>
                  <GoogleIcon icon={`list`} data={counterparty.counterparty}/>
                   {counterparty.counterparty}
                 </div>
             </NavLink>
      })}
      <div className='counterpary'> </div>      
         <form>
            <input type="file" name="counterparty" id="file" className="inputfile"
             accept=".json"
             onChange={uploadFiles}/>
               <label htmlFor="file" className="inputLable">
               Выберете файл <GoogleIcon icon={`add`} color={`#fedfaa`}/>
               </label>
            <button className='Basket inputLable' onClick={onSubmit}>
               отправить
            </button>
         </form>
    </div>
  )
}
