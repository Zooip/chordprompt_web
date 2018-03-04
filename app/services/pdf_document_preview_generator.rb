require "mini_magick"

class PdfDocumentPreviewGenerator

  class InvalidDocument < StandardError
    attr_reader :errors

    def initialize(errors)
      @errors=errors
      super("Unprocessable document. Reasons : #{errors_messages.join(';')}")
    end

    def errors_messages
      errors.map{|e|message_for(e)}
    end

    private

    def message_for(error_code)
      I18n.t("services.errors.document_preview_generators.pdf.#{error_code}")
    end


  end
  attr_reader :document

  def initialize(document)
    @document = document
  end

  def validate_document!
    errors=[]
    errors<<:no_file unless document.file
    errors<<:invalid_content_type unless document.file.content_type == "application/pdf"
    raise InvalidDocument.new(errors) if errors.any?
  end



  def create(options={})
    validate_document!

    image_preview=document.build_image_preview

    image=MiniMagick::Image.read(file_content, '.pdf')
    image.pages.each_with_index do |page,i|
      page.format('jpg',i,{
          density: 150,
          background: '#FFFFFF',
          alpha: 'remove',
      })
      image_preview.images<<BSON::Binary.new(page.to_blob)
      File.delete(page.path)
    end
    image_preview.save
  end

  def file_content
    document.file_stream.read
  end

end