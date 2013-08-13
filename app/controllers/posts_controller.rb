class PostsController < ApplicationController
	def index
		@posts=Post.all
	end
	def new
		@post=Post.new
	end
	def create
		Post.create post_params
		redirect_to root_url
	end
	def update
		redirect_to :back
	end
	def destroy
		params.permit!
		Post.destroy params[:id]
	end
	def show
		
	end
	def post_params
		params.require(:post).permit(:title,:photo,:text)
	end
end
