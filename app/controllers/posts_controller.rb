class PostsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote, :update, :destroy]

  respond_to :json

  def index
    @posts = Post.all
  end

  def new
    @post = Post.new(post_params.merge(user_id: current_user.id))
  end

  def create
    @post = Post.new(post_params.merge(user_id: current_user.id))
    @post.upvotes = 0
    if @post.save
      redirect_to @post
    else
      render 'new'
    end
  end

  def show
    @posts = Post.all
    @post = Post.find(params[:id])
    @comments = @post.comments.all
  end

  def upvote
    @post = Post.find(params[:id])
    @post.increment!(:upvotes)
    respond_with @post
  end

  def edit
    @post = Post.find(params[:id])
    render 'edit'
  end

  def update
    @post = Post.find(params[:id])
    @post.update(post_params)
    respond_with @post
  end

  def destroy
     @post = Post.find(params[:id])
     @post.delete
     redirect_to root_path
  end

  private
  def post_params
    params.permit(:title, :body, :excerpt, :category)
  end
end
