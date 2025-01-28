FROM ruby:3.2.2
WORKDIR /app
RUN apt-get update && apt-get install -y postgresql-client
COPY Gemfile* ./
RUN bundle install
COPY . .