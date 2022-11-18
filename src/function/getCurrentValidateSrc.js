import { url } from "../config/config";

//http://192.168.1.91:5000/static//Чертежи станков/Cтанок рт301/Устройство накатное Каталог/РТ301_41_151_Ролик_сглаживающий.jpg
export  const getCurrentValidateSrc=(src=``)=>{
   let validSrc = ``
   let reg = new RegExp(url)
   if(reg.test(src)){
      validSrc = src
   }
   else{
     validSrc = url+"static/"+src.split("//")[2]
   }   
   return validSrc
}

