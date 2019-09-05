# frozen_string_literal: true

# Candidate to job offer
class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :confirmable, :lockable

  has_many :job_applications, dependent: :destroy
  has_many :preferred_users
  has_one :personal_profile, as: :personal_profileable
  accepts_nested_attributes_for :personal_profile

  mount_uploader :photo, PhotoUploader, mount_on: :photo_file_name
  validates :photo,
            file_size: { less_than: 1.megabytes }

  validates :first_name, :last_name, presence: true

  validate :password_complexity

  after_save :compute_job_applications_notifications_counter

  def compute_job_applications_notifications_counter
    job_applications.each(&:compute_notifications_counter!)
  end

  def full_name
    [first_name, last_name].join(' ')
  end

  def password_complexity
    # Regexp extracted from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    regexp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,70}$/
    return if password.blank? || password =~ regexp

    errors.add :password, :not_strong_enough
  end

  def most_advanced_job_application
    job_applications.order(state: :desc).first
  end

  def already_applied?(job_offer)
    job_applications.select(:job_offer_id).map(&:job_offer_id).include?(job_offer.id)
  end

  def job_applications_active
    job_applications.joins(:job_offer).where.not(job_offers: { state: :archived })
  end
end
