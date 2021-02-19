# Stage 0: compile angular frontend
FROM node:latest as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build --prod


# Stage 1: serve app with nginx server
FROM nginx:latest
COPY --from=build /app/dist/horse-management  /usr/share/nginx/html

EXPOSE 4200

CMD ["nginx", "-g", "daemon off;"]
