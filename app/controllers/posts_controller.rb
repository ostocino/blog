class PostsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote, :update, :destroy]

  respond_to :json

  def index
    @altPosts = Post.all

    if params[:category]
      @posts = Post.where(:category => params[:category])
    else
      @posts = Post.all
    end
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
    @post = Post.friendly.find(params[:id])
    @comments = @post.comments.all
    @comment = Comment.new
    @user = User.find(@post.user_id)
  end

  def upvote
    @post = Post.friendly.find(params[:id])
    @post.increment!(:upvotes)
    redirect_to @post
  end

  def edit
    @post = Post.friendly.find(params[:id])
    render 'edit'
  end

  def update
    @post = Post.friendly.find(params[:id])
    @post.update(post_params)
    redirect_to @post
  end

  def destroy
     @post = Post.friendly.find(params[:id])
     @post.delete
     redirect_to root_path
  end

  private
  def post_params
    params.permit(:title, :body, :excerpt, :category)
  end
end
