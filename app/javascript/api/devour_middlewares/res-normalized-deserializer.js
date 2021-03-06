const deserialize = require('./_deserialize')
const _ = require('lodash')

function needsDeserialization (method) {
  return ['GET', 'PATCH', 'POST'].indexOf(method) !== -1
}

function isCollection (responseData) {
  return _.isArray(responseData)
}

export default {
  name: 'normalized-response',
  res: function (payload) {
    /*
     *   Note: The axios ajax response attaches the actual response data to
     *         `res.data`. JSON API Resources also passes back the response with
     *         a `data` attribute. This means we have `res.data.data`.
     */
    let jsonApi = payload.jsonApi
    let status = payload.res.status
    let req = payload.req
    let res = payload.res.data
    let errors = res.errors
    let meta = res.meta
    let links = res.links
    let incl = res.included

    let data = null
    let included=null

    if (status !== 204 && needsDeserialization(req.method)) {
      if (isCollection(res.data)) {
        data = deserialize.collection.call(jsonApi, res.data, incl)
      } else if (res.data) {
        data = deserialize.resource.call(jsonApi, res.data, incl)
      }
      if (isCollection(res.included)) {
        included = deserialize.collection.call(jsonApi, res.included, incl)
      } else if (res.included) {
        included = deserialize.resource.call(jsonApi, res.included, incl)
      }
    }

    if (res.data && data) {
      var params = ['meta', 'links']
      params.forEach(function (param) {
        if (res.data[param]) {
          data[param] = res.data[param]
        }
      })
    }

    return { data, errors, included, meta, links }
  }
}