class Api::ConversationsController < ApplicationController
  def index
    @conversations = current_user.conversations.includes(:members)
    render :index
  end

  def show
    @conversation = Conversation.includes(:members, :messages).find_by(id: params[:id])
    if @conversation
      render :show
    else
      render json: ["DM not found"], status: 404
    end
  end

  def create
    @conversation = Conversation.new
    if @conversation.save
      if params[:group]
        @conversation.group_bundle([current_user.id, *params[:conversation][:ids]])
      else
        @conversation.bundle(params[:conversation][:user1_id], params[:conversation][:user2_id], params[:conversation][:body])
      end
      render :show
    else
      render json: @conversation.errors.full_messages, status: 422
    end
  end

  private

  def convo_params
    params.require(:conversation).permit(:user1_id, :user2_id, :body, :ids)
  end

end
