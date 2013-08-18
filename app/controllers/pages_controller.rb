class PagesController < ApplicationController
  def about
  end

  def resume
  end

  def blog
  	@posts=Post.all
  end

  def contact
  end
end
