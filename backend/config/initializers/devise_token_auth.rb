DeviseTokenAuth.setup do |config|
  config.change_headers_on_each_request = false
  config.token_lifespan = 2.weeks
end
