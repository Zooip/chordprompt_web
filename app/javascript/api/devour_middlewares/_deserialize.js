const _ = require('lodash')

const cache = new class {
  constructor () { this._cache = [] }

  set (type, id, deserializedData) {
    this._cache.push({
      type: type,
      id: id,
      deserialized: deserializedData
    })
  }

  get (type, id) {
    const match = _.find(this._cache, r => r.type === type && r.id === id)
    return match && match.deserialized
  }

  clear () {
    this._cache = []
  }
}

function collection (items, included, useCache = false) {
  return items.map(item => {
    return resource.call(this, item, included, useCache)
  })
}

function resource (item, included, useCache = false) {
  if (useCache) {
    const cachedItem = cache.get(item.type, item.id)
    if (cachedItem) return cachedItem
  }

  let model = this.modelFor(this.pluralize.singular(item.type))
  if (!model) {
    throw new Error('Could not find definition for model "' + this.pluralize.singular(item.type) + '" which was returned by the JSON API.')
  }
  if (model.options.deserializer) return model.options.deserializer.call(this, item)

  let deserializedModel = {id: item.id, type: item.type}

  _.forOwn(item.attributes, (value, attr) => {
    var attrConfig = model.attributes[attr]

    if (_.isUndefined(attrConfig) && attr !== 'id') {
      attr = attr.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() })
      attrConfig = model.attributes[attr]
    }

    if (_.isUndefined(attrConfig) && attr !== 'id') {
      console.warn(`Resource response contains attribute "${attr}", but it is not present on model config and therefore not deserialized.`)
    } else {
      deserializedModel[attr] = value
    }
  })

  // Important: cache before parsing relationships to avoid infinite loop
  cache.set(item.type, item.id, deserializedModel)

  deserializedModel.relationships={}
  _.forOwn(item.relationships, (value, rel) => {
    var relConfig = model.attributes[rel]

    if (_.isUndefined(relConfig)) {
      rel = rel.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase() })
      relConfig = model.attributes[rel]
    }

    if (_.isUndefined(relConfig)) {
      console.warn(`Resource response contains relationship "${rel}", but it is not present on model config and therefore not deserialized.`)
    } else if (!isRelationship(relConfig)) {
      console.warn(`Resource response contains relationship "${rel}", but it is present on model config as a plain attribute.`)
    } else {
      deserializedModel.relationships[rel]=filteredRelationsFor.call(this, model, relConfig, item, included, rel)
    }


  })

  var params = ['meta', 'links']
  params.forEach(function (param) {
    if (item[param]) {
      deserializedModel[param] = item[param]
    }
  })

  cache.clear()

  return deserializedModel
}


function filteredRelationsFor (model, attribute, item, included, key) {
  if (item.relationships && item.relationships[key]) {
    return item.relationships[key].data
  } else {
    return null
  }
}


function isRelationship (attribute) {
  return (_.isPlainObject(attribute) && _.includes(['hasOne', 'hasMany'], attribute.jsonApi))
}

module.exports = {
  resource: resource,
  collection: collection
}
