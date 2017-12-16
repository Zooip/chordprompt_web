class SerializableSong < JSONAPI::Serializable::Resource
  type 'songs'
  attribute :id do
    @object.id.to_s
  end
  attribute :created_at
  attribute :updated_at
  attribute :title
  attribute :artist
  attribute :duration

  has_one :owner do
    linkage do
      { type: 'users', id: @object.owner_id.to_s }
    end
  end f

  link :self do
    @url_helpers.api_song_url(@object.id, host: @url_host)
  end

  link :image do
    @url_helpers.image_api_song_url(@object.id, host: @url_host)
  end
end
