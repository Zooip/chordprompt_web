require "mini_magick"

class MakeImageThumbs

  IMAGE_DIMENSIONS="400x300"

  def initialize(file_io, ext=nil)
    @file_io=file_io
    @ext=ext
  end

  def process
    image = MiniMagick::Image.read(@file_io, @ext)
    image.resize IMAGE_DIMENSIONS
    image.format "jpg"
    image.to_blob
  end

end