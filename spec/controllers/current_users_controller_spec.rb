require 'rails_helper'

RSpec.describe CurrentUsersController do
	let(:user) {User.create!(email: 'user@test.com', password: 'password')}
	
	describe 'show' do
		describe 'when a user is not logged in' do
			it 'returns a 401 and error message' do
				get :show

				message = json(response)['errors'].first

				expect(response.status).to eq 401
				expect(message).to eq 'Current user not found'
			end
		end

		describe 'when the user is logged in' do
			before do
				sign_in user
			end

			it 'returns the currently logged in user' do
				get :show

				expect(json(response)['current_user']['email']).to eq 'user@test.com'
			end
		end
	end
end
