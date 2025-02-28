threads_count = ENV.fetch("RAILS_MAX_THREADS", 5)
threads threads_count, threads_count

port ENV.fetch("PORT", 3000)
bind "tcp://0.0.0.0:#{ENV.fetch("PORT", 3000)}"

environment ENV.fetch("RAILS_ENV") { "development" }

workers ENV.fetch("WEB_CONCURRENCY", 2)

plugin :tmp_restart

pidfile ENV["PIDFILE"] if ENV["PIDFILE"]
