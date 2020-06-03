class Api::MembershipsController < ApplicationController

  def create
    @membership = Membership.new(member_params)
    if @membership.save
      @server = Server.find(@membership.subscribeable_id)
      render "api/servers/show"
    else
      render json: @membership.errors.full_messages, status: 422
    end
  end

  def destroy
    begin
      @membership = Membership.find(params[:id])
      @membership.destroy
      render json: { }, status: 204
    rescue
      render json: ["Record not found"], status: 404
    end
  end

  private

  def member_params
    params.require(:membership).permit(:member_id, :subscribeable_id)
  end
end
