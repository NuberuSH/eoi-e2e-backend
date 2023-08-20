FROM node:18-alpine

ENV NODE_ENV production

WORKDIR /app
ADD ./package.json ./package.json
ADD ./package-lock.json ./package-lock.json

RUN npm ci

COPY . .

EXPOSE 3000

CMD node run.js
