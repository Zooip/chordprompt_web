class JsonapiUncatchedError

  attr_reader :exception

  def initialize(exception)
    @exception=exception
  end

  def status
    500
  end

end