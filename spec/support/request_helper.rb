module Requests
	module JsonHelpers
		def json(response)
			JSON.parse(response.body)
		end
	end
end
