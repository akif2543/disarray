class Api::MessagesController < ApplicationController

  def index
    time = Time.at(params[:before].to_i/1000.0)
    @messages = Message
      .includes(:author)
      .where("messageable_type = 'Channel' AND messageable_id = :id AND created_at < :date", { id: params[:channel_id], date: time })
      .order(:created_at)
      .limit(20)
    render :index
  end

  def update
    @message = Message.includes(:author).find_by(id: params[:id])
    if @message
        if @message.author_id == current_user.id
          if @message.update(m_params)
            render :show
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
          render :show
        else
          render json: ["You don't have permission to do that."], status: 403
        end
    else
      render json: ["Message not found."], status: 404
    end
  end

  private

  def m_params
    params.require(:message).permit(:body)
  end
end
