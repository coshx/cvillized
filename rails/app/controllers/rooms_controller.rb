class RoomsController < ApplicationController
  before_action :set_room, only: [:show, :edit, :update, :destroy]

  # GET /rooms
  # GET /rooms.json
  def index
    @rooms = Room.all
  end

  # GET /rooms/1
  # GET /rooms/1.json
  def show
    @invited_users_hash = Hash.new
    Invitation.where(room: @room.id).each do |i|
      if @invited_users_hash[i.invited_user_id]
        @invited_users_hash[i.invited_user_id] += 1
      else
        @invited_users_hash[i.invited_user_id] = 1
      end
    end
    
    @statements = Statement.where(depth:1, room_id:@room.id).reverse
  end
  
  def add_statement_to_room
    @room = Room.find(params[:room_id])
    
    #LJC use :user_id => current_user.id
    Statement.create(:room_id => @room.id, :user_id => 1, :full_text => params[:full_text], :depth => params[:depth], :follow_statement_id => params[:follow_statement_id])

    session[:return_to] = "/room/" + @room.fb_comment_thread_id
    @statements = Statement.where(depth:1, room_id:@room.id).reverse
    respond_to do |format|
      format.js
    end
  end

  # GET /rooms/new
  def new
    @room = Room.new
  end

  # GET /rooms/1/edit
  def edit
  end

  # POST /rooms
  # POST /rooms.json
  def create
    @room = Room.new(room_params)

    respond_to do |format|
      if @room.save
        format.html { redirect_to @room, notice: 'Room was successfully created.' }
        format.json { render :show, status: :created, location: @room }
      else
        format.html { render :new }
        format.json { render json: @room.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /rooms/1
  # PATCH/PUT /rooms/1.json
  def update
    respond_to do |format|
      if @room.update(room_params)
        format.html { redirect_to @room, notice: 'Room was successfully updated.' }
        format.json { render :show, status: :ok, location: @room }
      else
        format.html { render :edit }
        format.json { render json: @room.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /rooms/1
  # DELETE /rooms/1.json
  def destroy
    @room.destroy
    respond_to do |format|
      format.html { redirect_to rooms_url, notice: 'Room was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_room
      @room = Room.find_by_fb_comment_thread_id(params[:fb_comment_thread_id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def room_params
      params.require(:room).permit(:fb_comment_thread_id)
    end
end
