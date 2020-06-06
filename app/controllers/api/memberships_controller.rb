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
    @membership = Membership.find_by(member_id: current_user.id, subscribeable_type: params[:membership][:subscribeable_type], subscribeable_id: params[:membership][:subscribeable_id])

    if @membership
      @membership.destroy
      render json: { userId: current_user.id, subscribeableId: @membership.subscribeable_id }, status: 204
    else
      render json: ["Record not found"], status: 404
    end
  end

end
