class JamSessionChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    js= JamSession.find(params[:id])
    stream_for js
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
