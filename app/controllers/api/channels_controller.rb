class Api::ChannelsController < ApplicationController

  def index
    @channels = Server.includes(:channels).find(params[:server_id]).channels
    render :index
  end

  def show
    begin
      @channel = Channel.find(params[:id])
    rescue
      render json: ["Channel not found"], status: 404
    end
    render :show
  end

  def create
    @server = current_user.owned_servers.find_by(id: params[:channel][:server_id])
    if @server
      @channel = Channel.new(channel_params)
      @channel.server_id = @server.id
      if @channel.save
        render :show
      else
        render json: @channel.errors.full_messages, status: 422
      end
    else
      render json: ["You don't have permission to do that."], status: 403
    end
  end

  def update
    if current_user.owned_servers.find_by(id: params[:channel][:server_id])
      @channel = Channel.find_by(id: params[:id])
      if @channel
        if @channel.update(channel_params)
          render :show
        else
          render json: @channel.errors.full_messages, status: 422
        end
      else
        render json: ["Channel not found."], status: 404
      end
    else
      render json: ["You don't have permission to do that."], status: 403
    end
  end

  def destroy
    if current_user.owned_servers.find_by(id: params[:channel][:server_id])
      @channel = Channel.find_by(id: params[:id])
      if @channel
        @channel.destroy!
        render :show
      else
        render json: ["Channel not found."], status: 404
      end
    else
      render json: ["You don't have permission to do that."], status: 403
    end      
  end

  private

  def channel_params
    params.require(:channel).permit(:name, :topic)
  end
end
