class Api::MessagesController < ApplicationController

  def index
    time = Time.at(params[:before].to_i/1000.0)
    @messages = Message
      .includes(:author)
      .where("messageable_type = :type AND messageable_id = :id AND created_at < :date", { type: params[:t] ? 'Channel' : 'Conversation', id: params[:channel_id], date: time })
      .order(:created_at)
      .limit(20)
    render :index
  end

  def create
    @conversation = Conversation.find_by(id: params[:conversation_id])
    if @conversation
      @message = Message.new(body: params[:message][:body], author_id: current_user.id, messageable: @conversation)
      if @message.save
        ChatChannel.broadcast_to(@conversation, format_message)
        render "api/conversations/show"
      else
        render json: @message.errors.full_messages, status: 422
      end
    else
      render json: ["Conversation not found."], status: 404
    end
  end

  def update
    @message = Message.includes(:author).find_by(id: params[:id])
    if @message
        if @message.author_id == current_user.id
          if @message.update(m_params)
            @channel = @message.messageable
            ChatChannel.broadcast_to(@channel, format_message)
          else
            render json: @message.errors.full_messages, status: 422
          end
        else
          render json: ["You don't have permission to do that."], status: 403
        end
    else
      render json: ["Message not found."], status: 404
    end
  end

  def destroy
    @message = Message.includes(:author).find_by(id: params[:id])
    if @message
        if @message.author_id == current_user.id
          @message.destroy
          @channel = @message.messageable
          @message.remove = true;
          ChatChannel.broadcast_to(@channel, format_message)
        else
          render json: ["You don't have permission to do that."], status: 403
        end
    else
      render json: ["Message not found."], status: 404
    end
  end

  private

  def format_message
    json = render(
        partial: "api/messages/full_message.json.jbuilder",
        locals: { message: @message })
    JSON.parse(json)
  end

  def m_params
    params.require(:message).permit(:body)
  end
end
