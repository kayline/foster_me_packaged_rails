require 'rails_helper'

RSpec.describe Animal do
	describe 'before validation' do
		let!(:user) { User.create(email: 'user@test.com', password: 'password') }
		let!(:foster_family) { FosterFamily.create(name: 'New Fam', active: true, user_id: user.id) }

		describe '.find_for_id_and_user' do
			it 'returns the family if it exists' do
				family = FosterFamily.find_for_id_and_user(foster_family.id, user.id)

				expect(family).to eq foster_family
			end

			it 'returns nil if the family does not belong to the user' do
				family = FosterFamily.find_for_id_and_user(foster_family.id, user.id + 1)

				expect(family).to eq nil
			end
		end
	end
end
