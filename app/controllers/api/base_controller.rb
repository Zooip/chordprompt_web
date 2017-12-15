class API::BaseController < ActionController::Base

  rescue_from StandardError, with: :render_500_error

  ## Default data


  ## Includes

  def include_params
    params[:include]
  end

  ## Sparse Fieldsets

  def fields_params
    p=params[:fields]
    p&.permit!&.to_h&.map{|k,v| [k,v.split(',')]}&.to_h
  end

  ## Pagination

  def page_params
    p=params.fetch(:page, {})
    p.permit(:number, :size)
  end

  def page
    page_params[:number]&.to_i
  end

  def per_page
    page_params[:size]&.to_i
  end

  def total_count_meta_for(collection)
    {total_count: collection.total_count}
  end

  def pagination_links_for(collection, base_url)
    base_uri=URI(base_url)
    base_params=URI.decode_www_form(base_uri.query||"").to_h
    {
        first: 1,
        last: collection.total_pages,
        prev: collection.prev_page,
        next: collection.next_page,
    }.map do |key,page|
      if page
        uri=base_uri.dup
        uri.query=URI.encode_www_form(base_params.merge({'page[number]'=>page}).to_a)
        [key,uri.to_s]
      else
        [key,nil]
      end
    end.to_h
  end

  #Errors

  def render_500_error(e)
    error=JsonapiUncatchedError.new(e)

    render jsonapi_errors:[error],
           status: error.status
  end

end