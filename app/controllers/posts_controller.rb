class PostsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote]  
  respond_to :json
  
  def index
    respond_with Post.all
  end

  def create
    respond_with Post.create(post_params.merge(user_id: current_user.id))
  end

  def show         
    respond_with Post.find(params[:id])
  end

  def upvote
    @post = Post.find(params[:id])
    @post.increment!(:upvotes)
    respond_with @post
  end

  def edit
  end

  def destroy
     Post.find(params[:id]).destroy
     #puts Post.find(params[:id])
     respond_with Post.all
  end

  private	
  def post_params
    params.require(:post).permit(:link, :title, :body, :category)
  end	
end
