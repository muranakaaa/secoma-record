module Settings
  def self.front_domain
    ENV["FRONT_DOMAIN"] || "http://localhost:3001"
  end
end
