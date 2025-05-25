# client/Dockerfile

# Step 1: Build Tailwind CSS
FROM node:18-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npx tailwindcss -i ./input.css -o ./output.css --minify

# Step 2: Serve via NGINX
FROM nginx:alpine
COPY --from=builder /app /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
