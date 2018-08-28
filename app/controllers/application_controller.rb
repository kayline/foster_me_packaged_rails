class ApplicationController < ActionController::Base
	protect_from_forgery with: :exception
	layout :layout_by_resource

	def fallback_index_html
    render :file => 'public/index.html'
  end

  def layout_by_resource
    if devise_controller?
      "devise"
    else
      "application"
    end
  end
end
