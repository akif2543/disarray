class ApplicationController < ActionController::Base

  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def ensure_logged_in
    
  end

  def login!(user)
    session[:session_token] = user.reset_session_token!
  end

  def logout!
    @current_user.reset_session_token! if current_user
    session[:session_token] = nil
    @current_user = nil
  end

  def logged_in?
    !!current_user
  end
end
