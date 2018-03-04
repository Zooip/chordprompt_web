// User Model
import { Model } from '@vuex-orm/core'
import SongDocument from './SongDocument'
import User from './User'

export default class Song extends Model {
    // This is the name used as module name of the Vuex Store.
    static entity = 'songs'

    // List of all fields (schema) of the post model. `this.attr` is used
    // for the generic field type. The argument is the default value.
    static fields () {
        return {
            id: this.attr(null),
            title: this.attr(""),
            artist: this.attr(""),
            created_at: this.attr(null, v=> (v&&(new Date(v)))),
            updated_at: this.attr(null, v=> (v&&(new Date(v)))),
            duration: this.attr(0),
            links: this.attr({}),
            song_documents: this.hasManyBy(SongDocument, 'song_documents'),
            owner_id: this.attr(null),
            owner: this.belongsTo(User,'owner_id')
        }
    }


}
