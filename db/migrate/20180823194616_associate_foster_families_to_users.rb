class AssociateFosterFamiliesToUsers < ActiveRecord::Migration[5.2]
  def change
    add_reference :foster_families, :user, foreign_key: true
  end
end
