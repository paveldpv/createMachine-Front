export const searchFilter = (arr = [], reg,name=`name`) => {
   return arr.filter(item => {
     if (reg == ``) {
       return item
     }
     else {
       let regEx = RegExp(reg)
       if (regEx.test(item[name]) || regEx.test(item[name].toLowerCase())) {
         return item
       }
     }
   })
 }