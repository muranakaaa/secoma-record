require_relative "boot"

require "rails"
require "action_cable/engine"
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_mailbox/engine"
require "action_text/engine"
require "action_view/railtie"

Bundler.require(*Rails.groups)

Dotenv::Rails.load if defined?(Dotenv)

module Backend
  class Application < Rails::Application
    config.load_defaults 7.2
    config.api_only = true
    config.time_zone = "Tokyo"
    config.active_record.default_timezone = :local
    config.i18n.default_locale = :ja
  end
end
