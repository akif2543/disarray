class Api::ServersController < ApplicationController

  def index
    @servers = current_user ? current_user.servers : Server.all
    # @servers = Server.all
    render :index
  end

  def show
    begin
      @server = current_user ? current_user.servers.includes(:members).find(params[:id]) : Server.includes(:members).find(params[:id])
      # @server = Server.includes(:members).find(params[:id])
      render :show
    rescue
      render json: ["Server not found."], status: 404
    end
  end

  def create
    @server = Server.new(server_params)
    @server.owner_id = current_user.id
    if @server.save
      Membership.create(member_id: @server.owner_id, subscribeable: @server)
      render :show
    else
      render json: @server.errors.full_messages, status: 422
    end
  end

  def update
    begin
      @server = current_user.servers.find(params[:id])
      if @server.update(server_params)
        render :show
      else
        render json: @server.errors.full_messages, status: 422
      end
    rescue
      render json: ["Server not found."], status: 404
    end
  end

  def destroy
    begin
      @server = current_user.servers.find(params[:id])
      @server.destroy
      render status: 204
    rescue
      render json: ["Server not found."], status: 404
    end
  end

  private

  def server_params
    params.require(:server).permit(:name, :owner_id)
  end
end