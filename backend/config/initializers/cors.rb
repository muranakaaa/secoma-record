Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "*"
    resource "*",
      headers: :any,
      expose: ['access-token', 'uid','client'],
      methods: [ :get, :post, :patch, :put, :delete, :options, :head ]
  end
end
