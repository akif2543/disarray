class Api::MembershipsController < ApplicationController

  def create
    @server = Server.includes(:members).find_by(join_code: params[:membership][:join_code])
    if @server
      unless current_user.is_member?(@server)
        @membership = Membership.new(member_id: current_user.id, subscribeable: @server)
        if @membership.save
          @server = Server.includes(:members, channels: :messages).find(@server.id)
          ServerChannel.broadcast_to(@server, format_response)
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

  def update
    @membership = Membership.find_by(member_id: current_user.id, subscribeable_type: "Server", subscribeable_id: params[:membership][:subscribeable_id])

    if @membership
      new_alias = params[:membership][:alias].length > 0 ? params[:membership][:alias] : nil
      if @membership.update(alias: new_alias)
        @server = @membership.subscribeable
        ServerChannel.broadcast_to(@server, format_update)
      else
        render json: @membership.errors.full_messages, status: 422
      end
    else
       render json: ["Record not found"], status: 404
    end
  end

  def destroy
    @membership = Membership.find_by(member_id: current_user.id, subscribeable_type: params[:membership][:subscribeable_type], subscribeable_id: params[:membership][:subscribeable_id])

    if @membership
      @server = @membership.subscribeable
      @membership.destroy
      ServerChannel.broadcast_to(@server, format_destroy)
    else
      render json: ["Record not found"], status: 404
    end
  end

  private

  def format_response
    JSON.parse(render("api/servers/show.json.jbuilder"))
  end

  def format_update
    JSON.parse(render("api/memberships/update.json.jbuilder"))
  end

  def format_destroy
    JSON.parse(render("api/memberships/destroy.json.jbuilder"))
  end

end
