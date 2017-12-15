FactoryBot.define do
  factory :song do
    title "MyString"
    artist "MyString"
    duration 1
    image ""

    owner user
  end
end
