class JamSession
  include Mongoid::Document
  include Mongoid::Timestamps
  include GlobalID::Identification

  REDIS_NAMESPACE="jamsession"
  TTL=30.minutes

  belongs_to :owner, class_name: "User"

  scope :active, -> { where(:updated_at.gte => Time.now-TTL ) }
  default_scope -> {active}

  belongs_to :song, optional: true
  field :started_at, type: Date
  field :position, type: Integer, default: 0
  field :playing, type: Boolean, default: false

  before_save :reset_song, if: :song_id_changed?
  after_update :notify_job

  def reset_song
    self.position=0
    self.playing=0
    self.started_at=nil
  end


  def notify_job
    NotifyJamSessionUpdateJob.perform_later(self)
  end

  def to_h
    {
        id: self.id.to_s,
        song_id: song_id,
        position: position,
        playing: playing
    }
  end

  def notify_change
    JamSessionChannel.broadcast_to(self,
                                  jamSession: self.to_h.map{|k,v| [k.to_s.camelize(:lower),v]}.to_h
    )
  end

  private

  def redis
    @redis||=Redis.new
  end

  def redis_key(key)
    "#{REDIS_NAMESPACE}:#{self.id}:#{key}"
  end



end
