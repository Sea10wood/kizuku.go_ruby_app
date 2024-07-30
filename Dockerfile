# Use the official Ruby image from the Docker Hub
FROM ruby:3.0.0-slim

# Set the working directory
WORKDIR /rails

# Install dependencies
RUN apt-get update -qq && \
    apt-get install -y build-essential libpq-dev && \
    apt-get clean

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install Bundler and gems
RUN gem install bundler -v '2.5.16' && \
    bundle install

# Copy the rest of the application code
COPY . .

# Expose port and define entrypoint
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
