class SerializableUser < JSONAPI::Serializable::Resource
  type 'users'
  attribute :id do
    @object.id.to_s
  end
  attribute :created_at
  attribute :updated_at
  attribute :email

  has_many :songs
  has_many :jam_sessions
end
