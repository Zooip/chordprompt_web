class SerializableJamSession < JSONAPI::Serializable::Resource
  type 'jam_sessions'
  attribute :id do
    @object.id.to_s
  end

  attribute :created_at
  attribute :updated_at
  attribute :started_at
  attribute :position
  attribute :playing

  has_one :owner
  has_one :song
end
