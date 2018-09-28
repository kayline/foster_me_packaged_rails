require 'rails_helper'

RSpec.describe WeightMeasurementsController do
	let(:user) 		{ User.create!(email: 'user@test.com', password: 'password') }
	let(:family) 	{ FosterFamily.create!(name: 'Belongs', user_id: user.id, active: true) }
	let(:animal) 	{ Animal.create!(name: 'Nanimal', foster_family_id: family.id) }
	
	describe 'create' do
		before do
			sign_in user
		end

		it 'creates a weight measurement for the animal on the current date' do
			post :create, params: {animal_id: animal.id, weight_in_grams: 300}

			weight = WeightMeasurement.find_by(animal_id: animal.id)
			expect(weight.weight_in_grams).to eq 300
			expect(weight.date).to eq Date.today
		end

		it 'returns the new measurement' do
			post :create, params: {animal_id: animal.id, weight_in_grams: 300}

			new_weight = JSON.parse(response.body)
			expect(new_weight['weight_in_grams']).to eq 300
			expect(new_weight['date']).to eq Date.today.to_s
		end

		describe 'when the animal does not exist' do
			it 'returns a 404' do
				post :create, params: {animal_id: 1000, weight_in_grams: 200}

				expect(response.status).to eq 404
			end
		end

		describe 'when the animal does not belong to the current user' do
			let(:other_user) 		{ User.create!(email: 'other@test.com', password: 'password') }
			let(:other_family) 	{ FosterFamily.create!(name: 'Nope', user_id: other_user.id, active: true) }
			let(:other_animal) 	{ Animal.create!(name: 'Not Yours', foster_family_id: other_family.id) }

			it 'returns a 404' do
				post :create, params: {animal_id: other_animal.id, weight_in_grams: 200}

				expect(response.status).to eq 404
			end
		end
	end
end