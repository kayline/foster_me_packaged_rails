require 'rails_helper'

RSpec.describe FosterFamiliesController do
	let(:user) {User.create!(email: 'user@test.com', password: 'password')}
	let!(:user_family) { FosterFamily.create!(name: 'Belongs', user_id: user.id, active: true)}
	let(:other_user) {User.create!(email: 'other_user@test.com', password: 'password')}
	let!(:other_family) { FosterFamily.create!(name: 'Not Mine', user_id: other_user.id, active: true)}

	describe 'index' do
		describe 'when the user is not logged in' do
			it 'returns a 401 and error message' do
				get :index

				message = json(response)['errors'].first

				expect(response.status).to eq 401
				expect(message).to eq 'Current user not found'
			end
		end

		describe 'when the user is logged in' do
			before do
				sign_in user
			end

			it 'returns all families belonging to that user' do
				get :index

				expect(json(response).length).to eq 1
				expect(json(response)[0]['name']).to eq 'Belongs'
			end

			describe 'when the user has no families' do
				let(:empty_user) { User.create(email: 'not_yet@test.com', password: 'pasword')}

				before do
					sign_in empty_user
				end

				it 'returns an empty array if the user has no families' do
					get :index

					expect(response.status).to eq 200
					expect(json(response).length).to eq 0
				end
			end
		end
	end

	describe 'show' do
		describe 'when the user is not logged in' do
			it 'returns a 401 and error message' do
				get :show, params: {id: user_family.id}

				message = json(response)['errors'].first

				expect(response.status).to eq 401
				expect(message).to eq 'Current user not found'
			end
		end

		describe 'when the user is logged in' do
			let!(:animal) { Animal.create!(name: 'Naminal', foster_family_id: user_family.id) }

			before do
				sign_in user
			end

			it 'returns the foster family with its animals' do
				get :show, params: {id: user_family.id}

				expect(response.status).to eq 200
				expect(json(response)['name']).to eq 'Belongs'
				expect(json(response)['active']).to eq true
				expect(json(response)['animals'].length).to eq 1
				expect(json(response)['animals'][0]['name']).to eq 'Naminal'
			end

			describe 'when the family does not belong to the user' do
				it 'returns a 401 error' do
					get :show, params: {id: other_family.id}

					message = json(response)['errors'].first

					expect(response.status).to eq 404
					expect(message).to eq 'Family not found'
				end
			end

			describe 'when the family does not exist' do
				it 'returns a 404 error' do
					get :show, params: {id: 2000}

					message = json(response)['errors'].first

					expect(response.status).to eq 404
					expect(message).to eq 'Family not found'
				end
			end
		end
	end

	describe 'create' do
		let(:pacific_timezone) { ActiveSupport::TimeZone.new("Pacific Time (US & Canada)") }
		let(:now) { DateTime.parse('2018-01-01').in_time_zone(pacific_timezone) }

		describe 'when the user is logged in' do

			before do
				sign_in user
			end

			it 'creates a new foster family for the current user' do
				get :create, params: {name: 'New Fam', active: false, animals: []}

				expect(response.status).to eq 201
				family = FosterFamily.find_by(name: 'New Fam')
				expect(family.user).to eq user
				expect(family.active).to eq false
			end


			it 'creates animals in the family if provided' do
				
				get :create, params: {name: 'New Fam', active: false, animals: [{name: 'Baby Cat', sex: 'Female', description: 'Tiny', date_of_birth: now}]}


				expect(response.status).to eq 201
				family = FosterFamily.find_by(name: 'New Fam')
				animal = Animal.find_by(name: 'Baby Cat')
				expect(animal.sex).to eq 'Female'
				expect(animal.description).to eq 'Tiny'
				expect(animal.date_of_birth.in_time_zone(pacific_timezone)).to eq now
				expect(family.animals).to eq [animal]
			end

			describe 'when the family params are not valid' do
				it 'returns the family errors' do
					get :create, params: {name: 'New Fam', animals: []}

					expect(response.status).to eq 400
					expect(JSON.parse(response.body)['errors']['family']).to eq ["Currently Fostering Status is required"]
				end
			end

			describe 'when one of the animals is not valid' do
				it 'returns the family errors if the create does not succeed' do
					get :create, params: {name: 'New Fam', animals: [{sex: 'Female', description: 'I need a name', date_of_birth: now}]}

					expect(response.status).to eq 400
					expect(JSON.parse(response.body)['errors']['animals']).to eq ["Name can't be blank"]
				end
			end
		end
	end
end
