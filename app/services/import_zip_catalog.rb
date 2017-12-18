require 'zip'

class ImportZipCatalog

  class NoCatalogDetected < StandardError; end

  def initialize(file_io, owner)
    @file_io=file_io
    @legacy_id_map={}
    @owner=owner
  end

  def process
    Zip::File.open_buffer(@file_io) do |zip|
      catalogue_file_entry=zip.glob('*.cat').first
      raise NoCatalogDetected unless catalogue_file_entry
      catalog_xml=Nokogiri::XML(catalogue_file_entry.get_input_stream)
      import_songs(zip,catalog_xml)
    end

    clear_keys
  end

  protected

  def import_id
    @import_id||=SecureRandom.hex(8)
  end

  def redis
    @redis||=Redis.new
  end>

  def import_songs(zip,catalog_xml)
    catalog_xml.xpath("/catalogue/chansons/chanson").each do |song_xml|

      duration=song_xml.at_xpath('./temps').content&.split(':')&.inject {|sum, n| sum.to_i*60 + n.to_i }

      image=nil
      image_filename=song_xml.at_xpath('./image')&.content&.gsub('\\','/')
      image_path=image_filename&&"Images/#{image_filename}"
      image_entry=image_path&&zip.glob(image_path).first
      if image_entry
        begin
          image=MakeImageThumbs.new(image_entry.get_input_stream,File.extname(image_path)).process
        rescue => e
          puts image_path
          puts e
          image=nil
        end
      end

      legacy_id=song_xml.at_xpath('./id').content


      song=Song.new(
          title: song_xml.at_xpath('./titre').content,
          artist: song_xml.at_xpath('./auteur').content,
          duration: duration,
          image: image&&BSON::Binary.new(image),
          owner: @owner
      )

      if song.save
        @legacy_id_map[legacy_id]=song

        import_documents(zip, song_xml, song)
      else
        puts "Could not save #{song.title}"
        puts song.errors.messages
      end


    end
  end


  TYPE_MAP={
      "Accords"=>:chords,
      "Paroles"=>:lyrics,
      "PDF"=>:pdf,
      #"AVI"=>:avi,
      "Grille"=>:chords_grid,
      "Mp3"=>:mp3,
  }

  TYPE_BASE_PATH={
      #avi: "Films",
      chords: 'SongBook',
      mp3: "Mp3",
      pdf: "PDF",
      lyrics: 'SongBook',
      chords_grid: 'Grilles',
  }

  def import_documents(zip, song_xml, song)
    song_xml.xpath('./documents/document').each do |doc_xml|
      legacy_type=doc_xml.attributes["type"].value
      type=TYPE_MAP[legacy_type]
      if type
        filename=doc_xml.at_xpath('./chemin')&.content&.gsub('\\','/')
        filepath=filename&&"#{TYPE_BASE_PATH[type]}/#{filename}"
        unless get_file_path(filepath)
          file_entry=filepath&&zip.glob(filepath).first
          if file_entry
            doc=song.song_documents.new(
                name: doc_xml.at_xpath('./nom').content,
                sub_type: type,
            )

            doc.set_file(file_entry.get_input_stream, {filename: File.basename(filename), meta_data:{from_legacy: true}})

            if doc.save
              store_file_path(filepath)
            else
              puts "Could not save #{doc.name}"
              puts doc.errors.messages
              doc.destroy_file
            end

          end
        end
      end
    end
  end

  def store_key(key)
    self.redis.rpush("zipimport:#{self.import_id}:keylist",key)
  end

  def clear_keys
    while(key=self.redis.rpop("zipimport:#{self.import_id}:keylist")) do
      redis.del(key)
    end
    redis.del("zipimport:#{self.import_id}:keylist")
  end

  def store_file_path(path)
    self.redis.set(path_key(path),"true")
    self.store_key(path_key(path))
  end

  def get_file_path(path)
    self.redis.get(path_key(path))
  end

  def path_key(path)
    "zipimport:#{self.import_id}:#{Digest::MD5.hexdigest(path)}"
  end


end