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
				it 'returns a 401 error' 
			end

			describe 'when the family does not exist' do
				it 'returns a 404 error'
			end
		end
	end
end
