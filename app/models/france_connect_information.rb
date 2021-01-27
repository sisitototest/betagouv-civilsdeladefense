# frozen_string_literal: true

class FranceConnectInformation < ApplicationRecord
  belongs_to :user

  validates :sub, :email, presence: true
end
