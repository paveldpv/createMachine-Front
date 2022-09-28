import React from 'react'
import GoogleIcon from '../additional/GoogleIcon/GoogleIcon'
import './PersonalPrice.css'


export default function PersonalPrice(props) {
   let {dataCreatePrice,id,number,price,src} = props.detail
   let index = props.index
   
   const editPrice = (e)=>{
      console.log(e.target.parentNode.parentNode.id);
   }
   const deletePrice = (e=>{
      console.log(e.target.parentNode.parentNode.id);
   })



  return (
    
      <ul className='listPrice' >
         <li>{index}</li>
         <li>{number}</li>
         <li className='editionPrice' id={id}>
            <div onClick={editPrice}  >
               <GoogleIcon icon={`edit`}/>
            </div>
            <div onClick={deletePrice}>
            <GoogleIcon icon={`delete`}/>
            </div>
            <div>{price} </div>
         </li>
         <li>{dataCreatePrice}</li>
         <li>
          {src?<a href={src} target='blank'>
             <GoogleIcon icon={`image`}/>
          </a>
          :
          <span className='notSrc'>
             <GoogleIcon icon={`image_not_supported`}/>
          </span>}
         </li>
      </ul>
    
  )
}
{/* <a href={src?src:``} target="blank">
{src?<GoogleIcon icon={`image`}/>:<GoogleIcon icon={`image_not_supported`}/>}
</a> */}