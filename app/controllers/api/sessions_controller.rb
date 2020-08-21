class Api::SessionsController < ApplicationController

  def create
    if User.find_by(email: params[:user][:email])
      @user = User.includes(:friends, :pending_friends, :requested_friends, :blocked_friends, servers: [:members, { channels: { messages: :author } }], conversations: [:members, { messages: :author }]).find_by_credentials(params[:user][:email], params[:user][:password])
      if @user
        login!(@user)
        render( partial: "api/users/current_user", locals: {user: @user})
      else
        render json: [["password", "Password does not match."]], status: 422
      end
    else
      render json: [["email", "Email does not exist."]], status: 422
    end
  end

  def destroy
    if current_user
      logout!
      render json: { }
    else
      render json: ["No current user"], status: 404
    end
  end
end