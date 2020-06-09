module ApplicationCable
  class Connection < ActionCable::Connection::Base
  #   identified_by :curent_user

  #   def connect
  #     self.current_user = find_verified_user
  #   end

  #   private

  #   def find_verified_user
  #     debugger
  #     verified_user = User.find_by(session_token: cookies.encrypted[:session][:session_token])
  #     verified_user ? verified_user : reject_unauthorized_connection
  #   end
  end
end
