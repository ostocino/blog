class CommentsController < ApplicationController
  before_filter :authenticate_user!, only: [:create, :upvote]
  respond_to :html, :json

  def create
    @post = Post.friendly.find(params[:post_id])
    comment = @post.comments.create(comment_params.merge(user_id: current_user.id))
    comment.upvotes = 0
    if comment.save
      redirect_to @post
    else
      render :new
    end
  end

  def upvote
    @post = Post.friendly.find(params[:post_id])
    @comment = @post.comments.find(params[:id])
    @comment.increment!(:upvotes)
    redirect_to @post
  end

  def destroy
    @post = Post.friendly.find(params[:post_id])
    @comment = @post.comments.find(params[:id])
    @comment.delete
    redirect_to @post
  end
  

  private
  def comment_params
    params.permit(:body)
  end

end
