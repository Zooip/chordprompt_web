class TestChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from 'testing'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def test
  end
end
