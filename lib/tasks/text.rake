namespace :test do
	task :all do
		exec 'bundle exec rspec && cd client && CI=true npm test'
	end	
end