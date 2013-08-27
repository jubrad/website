class CommentsController < ApplicationController
  def index
    #this probalby doesn't need to exist
  end

  def new
    @post=Post.find paras[:id]
    @comment=Comment.new
    session[:return_to] || request.referer
  end

  def create
    flash[:notice] ="comment submitted!"
    @post=Post.find(comment_params[:post_id])
    @comment=@post.comments.new comment_params
   
    if @comment.save
      respond_to do |format|
          format.js {}
      end
    else render nothing => :true
    end

  end

  def edit
    @comment=Comment.find(comment_params[:id])
    session[:return_to] || request.referer
    redirect_to session[:return_to]
  end

  def update

    comment=Comment.find comment_params[:id]
    if comment.update_attributes comment_params
      redirect_to session[:return_to]
    else
          redirect_to :back, :notice => 'There was an error updating your task!'
    end
  end

  def destroy
    Comment.destroy(comment_params[:id])
  end

  def comment_params
    params.require(:comment).permit(:name,:email,:message,:post_id)
  end
  def show
    #I'm not sure if I'll ever need to show a post
  end
end
