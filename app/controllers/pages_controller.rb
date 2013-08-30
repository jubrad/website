class PagesController < ApplicationController
  def about
  end

  def resume
  end

  def index

  end
  def create
  	# this will have code to submit an email to bradfield.justin7@gmail.com
  	# later I want I live chat with me form but this will do
  	params.permit!
  		#code
  	respond_to do |format|
  		format.js
  		format.html
  	end
  end

  def contact
  end
end
