FROM ruby:3.2.2
RUN apt-get update -qq && apt-get install -y \
    curl \
    build-essential \
    libpq-dev \
    libyaml-dev \
    nodejs \
    npm \
    yarn \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY Gemfile Gemfile.lock ./
RUN bundle install --jobs 4 --retry 3
COPY . .
CMD ["rails", "server", "-b", "0.0.0.0"]
