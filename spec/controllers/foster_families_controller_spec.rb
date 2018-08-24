require 'rails_helper'

RSpec.describe FosterFamiliesController do
	describe 'index' do
		describe 'when the user is not logged in' do
			it 'returns a 404 and error message' do
				get :index

				message = json(response)['errors'].first

				expect(response.status).to eq 401
				expect(message).to eq 'Current user not found'
			end
		end

		describe 'when the user is logged in' do
			let(:user) {User.create!(email: 'user@test.com', password: 'password')}
			let(:other_user) {User.create!(email: 'other_user@test.com', password: 'password')}
			let!(:user_family) { FosterFamily.create!(name: 'Belongs', user_id: user.id, active: true)}
			let!(:other_family) { FosterFamily.create!(name: 'Not Mine', user_id: other_user.id, active: true)}

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
end
