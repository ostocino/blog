class AddKeywordsToPosts < ActiveRecord::Migration
  def change
  	add_column :posts, :keywords, :string
  end
end
