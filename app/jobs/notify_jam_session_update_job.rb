class NotifyJamSessionUpdateJob < ApplicationJob
  queue_as :default

  def perform(jam_session, fields=nil)
    renderer=JSONAPI::Serializable::Renderer.new
    data=renderer.render(jam_session,
                         class: {
                             JamSession: SerializableJamSession,
                             Song: SerializableSong
                         },
                         expose:{
                             url_helpers: Rails.application.routes.url_helpers,
                             url_host:'http://127.0.0.1:3000'
                         },
                         fields: fields,
                         include: [:song]
    )

    JamSessionChannel.broadcast_to(jam_session,data)
  end

end
