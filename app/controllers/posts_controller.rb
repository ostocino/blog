class PostsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote, :update, :destroy]

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

  def update
   respond_with Post.update(params[:id], params[:post])
  end

  def destroy
     @post = Post.find(params[:id])
     @post.destroy
     render json: Post.all
  end

  private
  def post_params
    params.require(:id).permit(:title, :link, :body, :excerpt, :category)
  end
end
