class ApplicationController < ActionController::Base

  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= Rails.cache.fetch(session_token: session[:session_token], expires_in: 24.hours) do
      get_current_user
    end
  end

  def ensure_logged_in
    redirect_to root_url unless logged_in?
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

  private

  def get_current_user
    User.includes(:friends, :pending_friends, :requested_friends, :blocked_friends, servers: [:members, :channels], conversations: :members).find_by(session_token: session[:session_token])
  end

end
