Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins "http://localhost:3001", "https://secoma-record.com"

    resource "/api/*",
      headers: :any,
      expose: [ "access-token", "uid", "client" ],
      methods: [ :get, :post, :patch, :put, :delete, :head ]
  end
end
