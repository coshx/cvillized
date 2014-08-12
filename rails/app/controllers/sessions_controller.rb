class SessionsController < ApplicationController
  def create
    user = User.from_omniauth(env["omniauth.auth"])
    session[:user_id] = user.id
    if session[:return_to]
      redirect_to session[:return_to]
    else
      redirect_to '/'
    end
  end

  def destroy
    session[:user_id] = nil
    if session[:return_to]
      redirect_to session[:return_to]
    else
      redirect_to '/'
    end
  end
end