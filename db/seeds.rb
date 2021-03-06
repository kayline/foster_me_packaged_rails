# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

family = FosterFamily.create(name: "The Pie Babies", active: true)

Animal.create(name: "Pecan", date_of_birth: Date.parse("2017-03-01"), foster_family: family, sex: "Male", description: "The nutty one")
Animal.create(name: "Pumpkin", date_of_birth: Date.parse("2017-03-01"), foster_family: family, sex: "Female", description: "The cutest one")

AdminUser.create!(email: 'admin@example.com', password: 'password', password_confirmation: 'password') if Rails.env.development?