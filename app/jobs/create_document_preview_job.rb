class CreateDocumentPreviewJob < ApplicationJob
  queue_as :default

  def perform(song_document)
    song_document.create_preview
  end

end
