class SessionsController < ApplicationController
  def new
  end

  def create
  	user=User.authenticate(params[:user_name],params[:password])
  	if user
  		session[:user_id]=user.id
      #Change this to a user show path, which has forms
      # to create posts or manage the blog
  		redirect_to users_index_path, :notice => "logged in"
    else 
    	flash.now.alert='invalid information'
    	render 'new'
    end
  end

  def destroy
    session[:user_id]=nil
    redirect_to root_url, :notice => 'logged out'
  end
end
