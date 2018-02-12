import baseApi from './base'

export default {
  allPromise(){
    return baseApi.findAll('song').then((response)=>{

       return this.handle_paginated_response(response,[]).then((data)=>{
         return {
            data: data,
            meta: response.meta,
            links: response.links
          }
       })
    })
  },
  findPromise(id){
    return baseApi.find('song',id,{include:['song_documents']}).then((response)=>{
       return response.data
    })
  },
  handle_paginated_response(response, previousArray){
    //console.log({response: response})
    let currentlist=previousArray.concat(response.data)
    if(response.links.next)
    {
      return baseApi.request(response.links.next,'GET').then((res)=>{
        return this.handle_paginated_response(res,currentlist)
      })

    }else{
      return new Promise(function(resolve) {resolve(currentlist)})
    }
  }
}
