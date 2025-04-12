Sentry.init do |config|
  config.dsn = ENV.fetch('RAILS_SENTRY_DSN', nil)
  config.enabled_environments = %w(development staging production)
  config.breadcrumbs_logger = [
    :sentry_logger,
    :active_support_logger,
    :monotonic_active_support_logger,
    :http_logger
  ]

  config.sample_rate = 1
  config.traces_sample_rate = 0.1
  config.send_default_pii = true
  config.environment = Rails.env
  config.include_local_variables = true
end
