FROM node:12-alpine as builder
WORKDIR /my-app
COPY package.json /my-app/package.json
RUN apk --no-cache add --virtual builds-deps build-base python
RUN npm install
COPY . /my-app
RUN npm config set unsafe-perm true
RUN npm run build

FROM node:12-alpine
WORKDIR /my-app
COPY --from=builder /my-app/build /my-app
COPY package.json /my-app/package.json
RUN npm install --only=prod
VOLUME /my-app
EXPOSE 3001
CMD ["node", "index.js"]
