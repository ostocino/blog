class AddExcerptToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :excerpt, :string
  end
end
