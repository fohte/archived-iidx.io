FROM node:10.13.0-alpine

WORKDIR /app/frontend

COPY frontend/package.json frontend/yarn.lock /app/frontend/

RUN yarn install --frozen-lockfile

COPY frontend /app/frontend/

RUN yarn run build:prod

CMD ["yarn", "run", "start:prod"]
