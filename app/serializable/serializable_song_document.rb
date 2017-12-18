class SerializableSongDocument < SerializableBase
  type 'song_documents'
  attribute :id do
    @object.id.to_s
  end

  attribute :created_at
  attribute :updated_at
  attribute :sub_type
  attribute :name

  has_one :song

  link :self do
  	 @url_helpers.api_song_song_document_url(@object.song.id,@object.id, host: @url_host)
  end

  link :content do
    @url_helpers.content_api_song_song_document_url(@object.song.id,@object.id, host: @url_host)
  end


end
