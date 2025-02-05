DeviseTokenAuth.setup do |config|
  config.default_confirm_success_url = "https://secoma-record.vercel.app/sign_in"
  config.change_headers_on_each_request = false
  config.token_lifespan = 2.weeks
end
