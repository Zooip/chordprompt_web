class ImagePreview
  include Mongoid::Document
  include GlobalID::Identification

  field :images, type: Array, default: []

  embedded_in :song_document

  def to_html
    images.map{|bin|Base64.encode64(bin.data)}.map{|b64|"<img class=\"song_document_preview\" src=\"data:image/jpg;base64,#{b64}\"/>"}.join
  end
end
