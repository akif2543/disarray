class Api::MessagesController < ApplicationController

  def update
    @message = Message.find_by(id: params[:id])
    if @message
        if @message.author_id == current_user.id
          if @message.update(m_params)
            render :show
          else
            render json: @message.errors.full_messages, 422
          end
        else
          render json: ["You don't have permission to do that."], status: 403
        end
    else
      render json: ["Message not found."], status: 404
    end
  end

  def destroy
    @message = Message.find_by(id: params[:id])
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
