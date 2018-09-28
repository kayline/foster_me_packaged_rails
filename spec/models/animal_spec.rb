require 'rails_helper'

RSpec.describe Animal do
	let(:user) { User.create(email: 'user@test.com', password: 'password') }
	let(:foster_family) { FosterFamily.create(name: 'New Fam', active: true, user_id: user.id) }
	
	describe 'before validation' do
		describe 'when the attrs include a profile photo' do
			before do
				test_image_location = Rails.root.join('spec', 'fixtures', 'files', 'what-cat.jpg')
				
				encoded_profile_photo = Base64.strict_encode64(IO.binread(test_image_location))
				file_type_prefix = 'data:thingy/stuff;base64,'

				profile_photo_params = {
					data_uri: file_type_prefix + encoded_profile_photo,
					file_type: 'image/jpeg',
					filename: 'what-cat.jpg'
				}

				attrs = { name: 'Baby Cat', profile_photo_data: profile_photo_params, foster_family_id: foster_family.id }

				@animal = Animal.new(attrs)
			end

			it 'attaches the photo to the animal' do
				expect(@animal.profile_photo.attached?).to be_falsey

				@animal.validate!

				expect(@animal.profile_photo.attached?).to be_truthy
				expect(@animal.profile_photo.filename).to eq 'what-cat.jpg'
			end
		end

		describe 'when the attrs do not include a profile photo' do
			let(:animal) { Animal.new({name: 'Baby Cat', foster_family_id: foster_family.id}) }

			it 'works' do
				expect(animal.valid?).to be_truthy
			end
		end
	end

	describe '#belongs_to_user?' do
		let(:animal) { Animal.create!(name: 'Yours', foster_family_id: foster_family.id) }
		let(:other_user) 		{ User.create!(email: 'other@test.com', password: 'password') }

		it 'returns true if the animal belongs to a family that belongs to the user' do
			expect(animal.belongs_to_user?(user)).to be_truthy
		end

		it 'returns false if the parent family belongs to a different user' do
			expect(animal.belongs_to_user?(other_user)).to be_falsey
		end
	end
end
