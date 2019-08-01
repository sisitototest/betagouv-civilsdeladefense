# frozen_string_literal: true

FactoryBot.define do
  factory :job_application do
    job_offer
    user
    terms_of_service true
    certify_majority true
    after(:create) do |job_application|
      job_application.personal_profile = create(:personal_profile,
                                                personal_profileable: job_application)
    end
  end
end
