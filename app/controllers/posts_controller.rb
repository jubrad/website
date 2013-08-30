class PostsController < ApplicationController
	
  def all_posts
  		@posts=Post.all.find(:all, :order => "created_at DESC")
  end
   helper_method :all_posts


	def index
		#change post.last to be a highlighted
		#post or post with highlighted set true
		@post=Post.last
		@comment=@post.comments.new

	end

	def new
		@post=Post.new
	end
	def create
		Post.create post_params
		redirect_to root_url
		respond_to do |format|
			format.js
			format.html
		end
	end
	def edit
		@post=Post.find params[:id]
		session[:return_to] || request.referer
	end

	def update
		post=Post.find post_params[:id]
		if post.update_attributes post_params
			redirect_to session[:return_to]
		else
      		redirect_to :back, :notice => 'There was an error updating your task!'
		end
	end
	def destroy
		Post.destroy(post_params[:id])
	end
	def show
		@post=Post.find params[:id]
	end
	def post_params
		params.require(:post).permit(:id,:title,:photo,:text)
	end
	private

end
