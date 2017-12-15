import baseApi from './base'

export default {
  allPromise(){
    return baseApi.findAll('song').then((response)=>{
       return this.handle_paginated_response(response,[])
    })
  },
  handle_paginated_response(response, previousArray){
    let currentlist=previousArray.concat(response.data)
    if(response.links.next)
    {
      return baseApi.request(response.links.next,'GET').then((res)=>{
        return this.handle_paginated_response(res,currentlist)
      })

    }else{
      return currentlist
    }
  }
}
