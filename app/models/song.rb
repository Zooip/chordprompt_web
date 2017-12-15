class Song
  include Mongoid::Document
  include Mongoid::Timestamps
  field :title, type: String
  field :artist, type: String
  field :duration, type: Integer
  field :image, type: BSON::Binary

  belongs_to :owner, class_name: "User"

  validates :title, presence: true

end
