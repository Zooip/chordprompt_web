class SongDocument
  include Mongoid::Document
  include Mongoid::Timestamps

  embedded_in :song

  field :sub_type, type: Symbol
  field :name, type: String

  field :file_id, type: BSON::ObjectId

  before_destroy :destroy_file
  after_save :destroy_old_file, if: :file_id_changed?

  def file
    self.file_id&&Mongoid::GridFs.get(self.file_id)
  end

  def file= readable
    f=Mongoid::GridFs.put(readable)
    self.file_id=f.id
  end

  def destroy_file
    if f=self.file
      Mongoid::GridFs.delete(f.id)
    end
  end

  def destroy_old_file
    if changed_attributes["file_id"]
      Mongoid::GridFs.delete(changed_attributes["file_id"])
    end
  end
end
