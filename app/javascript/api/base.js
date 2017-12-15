import JsonApi from 'devour-client'
import * as models from  './models.js.erb'

var protocol = location.protocol;
var slashes = protocol.concat("//");
var host = slashes.concat(window.location.host);

const jsonApi = new JsonApi({
  apiUrl: host.concat('/api')
})

jsonApi.define('song', models.song_attributes)

export default jsonApi