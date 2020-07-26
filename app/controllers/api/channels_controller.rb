class Api::ChannelsController < ApplicationController

  def index
    @channels = Server.includes(:channels).find(params[:server_id]).channels
    render :index
  end

  def show
    @channel = Channel.includes(messages: :author).find_by(id: params[:id])
    if @channel
      render :show
    else
      render json: ["Channel not found"], status: 404
    end
  end

  def create
    @server = current_user.owned_servers.find_by(id: params[:channel][:server_id])
    if @server
      @channel = Channel.new(channel_params)
      @channel.server_id = @server.id
      if @channel.save
        ServerChannel.broadcast_to(@server, format_response)
        # render :show
      else
        render json: @channel.errors.full_messages, status: 422
      end
    else
      render json: ["You don't have permission to do that."], status: 403
    end
  end

  def update
    @server = current_user.owned_servers.find_by(id: params[:channel][:server])
    if @server
      @channel = Channel.includes(messages: :author).find_by(id: params[:id])
      if @channel
        if @channel.update(channel_params)
          ServerChannel.broadcast_to(@server, format_response)
          # render :show
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
    @channel = Channel.includes(messages: :author).find_by(id: params[:id])
    if @channel
      @server = current_user.owned_servers.find_by(id: @channel.server_id)
      if @server
        @channel.destroy!
        ServerChannel.broadcast_to(@server, format_destroy)
        # render :show
      else
        render json: ["You don't have permission to do that."], status: 403
      end      
    else
      render json: ["Channel not found."], status: 404
    end
  end

  private

  def format_response
    JSON.parse(render("api/channels/show.json.jbuilder"))
  end

  def format_destroy
    JSON.parse(render("api/channels/destroy.json.jbuilder"))
  end

  def channel_params
    params.require(:channel).permit(:name, :topic)
  end
end
