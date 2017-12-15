class API::SongsController < API::BaseController
  before_action :set_song, only: [:show, :update, :destroy]

  # GET /songs
  # GET /songs.json
  def index
    @songs = Song.page(page).per(per_page)
    render jsonapi: @songs,
           include: include_params,
           meta: {
               **total_count_meta_for(@songs)
           },
           links:{
               **pagination_links_for(@songs,request.url)
           },
           fields: fields_params
  end

  # GET /songs/1
  # GET /songs/1.json
  def show
    render jsonapi: @song,
           fields: fields_params
  end

  # POST /songs
  # POST /songs.json
  def create
    @song = Song.new(song_params)

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
      @song = Song.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def song_params
      params.require(:song).permit(:title, :artist, :duration, :image)
    end
end
