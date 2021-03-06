# frozen_string_literal: true

class RemoveUnusedFieldsFromPersonalProfiles < ActiveRecord::Migration[6.0]
  def change
    remove_column :personal_profiles, :birth_date
    remove_column :personal_profiles, :nationality
    remove_column :personal_profiles, :has_residence_permit
    remove_column :personal_profiles, :study_type
    remove_column :personal_profiles, :specialization
  end
end
