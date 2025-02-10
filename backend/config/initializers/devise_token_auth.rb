DeviseTokenAuth.setup do |config|
  config.change_headers_on_each_request = false
  config.token_lifespan = 2.weeks
  config.token_cost = Rails.env.test? ? 4 : 10
  config.default_confirm_success_url = Rails.env.production? ? 'https://secoma-record.com/sign_in' : 'http://localhost:3001/sign_in'
end