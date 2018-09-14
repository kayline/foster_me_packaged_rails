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

		describe '#animal_errors' do
			let(:family_with_animals) { FosterFamily.new(name: "Problem Children", active: true, user_id: user.id)}
			let(:animal_1) { Animal.new() }
			let(:animal_2) { Animal.new({name: 'Error Free'}) }

			it 'returns all errors for all animals that belong to the family' do
				family_with_animals.animals = [animal_1, animal_2]
				family_with_animals.valid?
				expect(family_with_animals.animal_errors).to eq ["Name can't be blank"]
			end
		end
	end
end
