// User Model
import { Model } from '@vuex-orm/core'
//import Song from './Song'

export default class SongDocument extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'song_documents'

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields () {
    return {
      id: this.attr(null),
      created_at: this.attr(null, v=> (v&&(new Date(v)))),
      updated_at: this.attr(null, v=> (v&&(new Date(v)))),
      name: this.attr(""),
      sub_type: this.attr(""),
      links: this.attr({}),
      song_id: this.attr(null)
      //song: this.belongsTo(Song, 'song_id')
    }
  }
}
