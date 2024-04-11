# Stage 1: Build the React application
FROM node:14-alpine as build
WORKDIR /app
COPY ./globetalk-front/package.json ./globetalk-front/package-lock.json ./
RUN npm ci
COPY ./globetalk-front ./
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
