class SongDocument
  include Mongoid::Document
  include Mongoid::Timestamps
  include GlobalID::Identification

  SUBTYPES=[ :pdf, :chords, :chords_grid, :lyrics, :mp3]

  embedded_in :song
  embeds_one :image_preview

  field :sub_type, type: Symbol
  field :name, type: String
  field :file_id, type: BSON::ObjectId

  validates :sub_type, inclusion: SUBTYPES

  before_destroy :destroy_file
  after_save :destroy_old_file, if: :file_id_changed?
  after_save :schedule_preview, if: :file_id_changed?

  def file
    self.file_id&&gridfs_bucket.find_one(_id: self.file_id)
  end

  def file=readable
    set_file(readable)
  end

  def file_stream(&block)
    gridfs_bucket.open_download_stream(self.file_id,&block)
  end

  def set_file(readable, attributes={})
    filename=attributes.delete(:filename)
    self.file_id=gridfs_bucket.upload_from_stream(filename, readable, attributes)
  end

  def destroy_file
    if self.file_id
      gridfs_bucket.delete(self.file_id)
    end
  end

  def destroy_old_file
    if changed_attributes["file_id"]
      gridfs_bucket.delete(changed_attributes["file_id"])
    end
  end

  def schedule_preview
    CreateDocumentPreviewJob.perform_later(self)
  end

  def create_preview
    if preview_generator
      preview_generator.new(self).create
    end
  end

  #private

  def gridfs_bucket
    Mongoid.default_client.database.fs
  end

  def preview_generator
    begin
      "#{sub_type.to_s.camelcase}DocumentPreviewGenerator".constantize
    rescue NameError
      nil
    end
  end
end


