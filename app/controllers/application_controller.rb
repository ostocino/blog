class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  before_filter :configure_permitted_parameters, if: :devise_controller?
  before_action :authenticate_user!

  protected

  def configure_permitted_parameters
  	devise_parameter_sanitizer.for(:sign_up) {|u| u.permit(:email, :username, :password, :password_confirmation) }
  	devise_parameter_sanitizer.for(:sign_in) << :username
  	devise_parameter_sanitizer.for(:account_update) << :username
  end

end