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
    @conversation = Conversation.new(owner_id: current_user.id, group: !!params[:group])
    if @conversation.save
      if params[:group]
        @conversation.group_bundle([current_user.id, *params[:conversation][:ids]])
      else
        @conversation.bundle(params[:conversation][:user1_id], params[:conversation][:user2_id], params[:conversation][:body])
      end
      @conversation = Conversation.includes(:members).find(@conversation.id)
      group_broadcast
      # render :show
    else
      render json: @conversation.errors.full_messages, status: 422
    end
  end

  def update
    @conversation = Conversation.includes(:members, :messages).find_by(id: params[:id])
    if @conversation
      if params[:add]
        @conversation.update(group: true) unless @conversation.group
        @conversation.group_bundle(params[:conversation][:ids])
      else
       @conversation.update(convo_params)
      end
      group_broadcast
    else
      render json: ["DM not found"], status: 404
    end
  end

  private

  def group_broadcast
    convo = format_convo
    @conversation.members.each { |m| ConversationChannel.broadcast_to(m, convo) }
  end
  
  def format_convo
    JSON.parse(render("api/conversations/show.json.jbuilder"))
  end

  def convo_params
    params.require(:conversation).permit(:user1_id, :user2_id, :body, :ids, :name, :icon)
  end

end
