import JsonApi from 'devour-client'
import * as models from  './models.js.erb'
import normalizedResponseMiddleware from './devour_middlewares/res-normalized-deserializer'

const protocol = location.protocol;
const slashes = protocol.concat("//");
const host = slashes.concat(window.location.host);



const jsonApi = new JsonApi({
  apiUrl: host.concat('/api')
})

//jsonApi.replaceMiddleware('response',normalizedResponseMiddleware)


const responseLoggerMiddleware = {
  name: 'response-logger',
  req: (payload) => {
    console.log(payload)
    return payload
  }
}

//jsonApi.insertMiddlewareAfter('response', responseLoggerMiddleware)



jsonApi.define('song', models.song_attributes)
jsonApi.define('song_document', models.song_document_attributes)
jsonApi.define('user', models.user_attributes)

export default jsonApi