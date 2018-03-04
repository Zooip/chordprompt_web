class API::SongDocumentsController < API::BaseController
  before_action :set_song
  before_action :set_song_document, only: [:show, :update, :destroy, :content, :html]

  # GET /songs
  # GET /songs.json
  def index
    @song_documents = @song.song_documents.page(page).per(per_page)
    render jsonapi: @song_documents,
           include: include_params,
           meta: {
               **total_count_meta_for(@song_documents)
           },
           links: {
               **pagination_links_for(@song_documents, request.url)
           },
           fields: fields_params
  end

  # GET /songs/1
  # GET /songs/1.json
  def show
    render jsonapi: @song_document,
           include: include_params,
           fields: fields_params
  end

  # GET /songs/1/content
  def content
    if @song_document.file
      send_data @song_document.file.data, :type => @song_document.file.content_type, :disposition => 'inline'
    end
  end

  # GET /songs/1/html
  def html
    if file = @song_document.file
      case @song_document.sub_type
        when :chords
          render inline: Chordpro.html(file.data), content_type: 'text/html'
        when :pdf
          render inline: @song_document.image_preview&.to_html, content_type: 'text/html'
      end
    end
  end

  # POST /songs
  # POST /songs.json
  def create
    @song_document = @song.song_documents.new(song_params)
    if @song.save
      render :show, status: :created, location: @song
    else
      render json: @song.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /songs/1
  # PATCH/PUT /songs/1.json
  def update
    if @song.update(song_params)
      render :show, status: :ok, location: @song
    else
      render json: @song.errors, status: :unprocessable_entity
    end
  end

  # DELETE /songs/1
  # DELETE /songs/1.json
  def destroy
    @song.destroy
  end

  private


  # Use callbacks to share common setup or constraints between actions.
  def set_song
    @song = Song.find(params[:song_id])
  end

  def set_song_document
    @song_document = @song.song_documents.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def song_params
    params.require(:song).permit(:title, :artist, :duration, :image)
  end
end
