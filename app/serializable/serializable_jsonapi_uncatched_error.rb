class SerializableJsonapiUncatchedError < JSONAPI::Serializable::Error

  status { @object.status }
  title  { @object.exception.class.name }
  detail { @object.exception.message }
  if Rails.env != 'production'
    meta do
      {
          trace: @object.exception.backtrace
      }
    end
  end

end