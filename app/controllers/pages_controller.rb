class PagesController < ApplicationController
  
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  respond_to :json

	before_filter :authenticate_user!, :except => [:about]

  def about
  end

end
