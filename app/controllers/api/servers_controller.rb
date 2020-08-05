class Api::ServersController < ApplicationController

  def index
    @servers = current_user ? current_user.servers.includes(:channels) : Server.all
    render :index
  end

  def show
    @server = Server.includes(:members, :channels).find_by(id: params[:id])
    if @server && current_user.is_member?(@server)
      render :show
    else
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
      else
        render json: @server.errors.full_messages, status: 422
      end
    rescue
      render json: ["Server not found."], status: 404
    end
  end

  def destroy
    begin
      @server = current_user.owned_servers.includes(:members, :channels).find(params[:id])
      @server.destroy
      ServerChannel.broadcast_to(@server, format_destroy)
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
