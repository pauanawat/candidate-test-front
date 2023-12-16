# Stage 1: Build the application
FROM node:14 AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Create the final image
FROM nginx:1.19.0-alpine
COPY --from=build-stage /app/build/ /usr/share/nginx/html
# COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD ["nginx", "-g", "daemon off;"]