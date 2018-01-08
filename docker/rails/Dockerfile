FROM ruby:2.5.0

RUN apt-get update -qq

# Install node and yarn for webpacker
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get install -y nodejs
RUN apt-get update && apt-get install yarn

RUN apt-get install -y mysql-client

WORKDIR /app
