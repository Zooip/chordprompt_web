class JamSessionChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    #
    puts params

    jam_session=JamSession.find(params[:id])
    stream_for jam_session
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
