class Api::ServersController < ApplicationController

  def index
    @servers = current_user ? current_user.servers.includes(:channels) : Server.all
    # @servers = Server.all
    render :index
  end

  def show
    begin
      # @server = current_user ? current_user.servers.includes(:members).find(params[:id]) : Server.includes(:members).find(params[:id])
      @server = Server.includes(:members, channels: :messages).find(params[:id])
      render :show
    rescue
      render json: ["Server not found."], status: 404
    end
  end

  def create
    @server = Server.new(server_params)
    @server.owner_id = current_user.id
    if @server.save
      @server.bundle
      render :show
    else
      render json: @server.errors.full_messages, status: 422
    end
  end

  def update
    begin
      @server = current_user.servers.includes(:members, :channels).find(params[:id])
      if @server.update(server_params)
        ServerChannel.broadcast_to(@server, format_response)
        # render :show
      else
        render json: @server.errors.full_messages, status: 422
      end
    rescue
      render json: ["Server not found."], status: 404
    end
  end

  def destroy
    begin
      @server = current_user.owned_servers.find(params[:id])
      @server.destroy
      ServerChannel.broadcast_to(@server, format_destroy)
      # render :destroy
    rescue
      render json: ["Server not found."], status: 404
    end
  end

  private

  def format_response
    JSON.parse(render("api/servers/show.json.jbuilder"))
  end

  def format_destroy
    JSON.parse(render("api/servers/destroy.json.jbuilder"))
  end

  def server_params
    params.require(:server).permit(:name, :owner_id, :icon)
  end
end
