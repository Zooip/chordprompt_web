class Song
  include Mongoid::Document
  include Mongoid::Timestamps
  include GlobalID::Identification

  field :title, type: String
  field :artist, type: String
  field :duration, type: Integer
  field :year, type: Integer
  field :image, type: BSON::Binary

  belongs_to :owner, class_name: "User"
  embeds_many :song_documents, cascade_callbacks: true


  validates :title, presence: true

  def image_base64
    image.as_json["$binary"]
  end



end
