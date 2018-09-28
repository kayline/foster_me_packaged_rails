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
	end
end