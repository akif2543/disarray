class Api::MembershipsController < ApplicationController

  def create
    @server = Server.includes(:members).find_by(join_code: params[:membership][:join_code])
    if @server
      unless current_user.is_member?(@server)
        @membership = Membership.new(member_id: current_user.id, subscribeable: @server)
        if @membership.save
          @server = Server.includes(:members).find(@server.id)
          render "api/servers/show"
        else
          render json: @membership.errors.full_messages, status: 422
        end
      else
        render "api/servers/show"
      end
    else
      render json: ["(The invite is invalid or has expired."], status: 404
    end
  end

  def destroy
    begin
      @membership = Membership.find(params[:id])
      @membership.destroy
      render json: {  success: true }, status: 204
    rescue
      render json: ["Record not found"], status: 404
    end
  end
end
