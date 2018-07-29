FROM ruby:2.5.0

RUN apt-get update -qq

# Install node
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash

RUN apt-get install -y mysql-client

WORKDIR /app
