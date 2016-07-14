class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.string :body
      t.integer :upvotes
      t.references :post, index: true

      t.timestamps null: false
    end

    remove_foreign_key :comments, :posts

    add_foreign_key :comments, :posts, on_delete: :cascade
  end
end
