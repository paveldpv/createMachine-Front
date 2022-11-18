export const getPerformersCurrentOrders=(order=[])=>{
   let result = []
   let temp = new Set()
   order.map(order=>temp.add(JSON.stringify(order.performer)))     
   temp.forEach(element => {
      result.push(JSON.parse(element));
   });   
   return  result
}

