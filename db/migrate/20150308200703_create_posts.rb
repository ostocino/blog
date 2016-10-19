class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.string :post_url
      t.integer :upvotes
      t.string :category
    	t.string :image_url
    	t.text :excerpt
    	t.text :body

      t.timestamps null: false
    end
  end
end
