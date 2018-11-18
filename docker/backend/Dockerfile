FROM ruby:2.5.3

RUN apt-get update -qq && apt-get install -y mysql-client

WORKDIR /app/backend

COPY backend/Gemfile backend/Gemfile.lock /app/backend/

RUN bundle install --jobs=4 --path=/bundle --deployment

COPY backend /app/backend/
