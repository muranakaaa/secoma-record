FROM ruby:3.2.2
WORKDIR /app
RUN apt-get update && apt-get install -y postgresql-client
COPY Gemfile* ./
RUN bundle install
COPY . .
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]