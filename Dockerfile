# Notes

# Multi-stage build: keeps the final image small — only Nginx + static files.
# Cached dependency install: package*.json copied first for faster rebuilds.
# SPA routing: if your app uses React Router, you may need a custom nginx.conf that redirects unknown routes to index.html.

# ---------- Stage 1: Build ----------
FROM node:22-alpine AS build

# Set working directory
WORKDIR /app

# Copy dependency files first for better layer caching
COPY package*.json ./

# Install dependencies (clean, reproducible)
RUN npm ci

# Copy the rest of the app
COPY . .

# Build for production
RUN npm run build

# ---------- Stage 2: Serve with Nginx ----------
FROM nginx:alpine AS production

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy React build output to nginx web root
COPY --from=build /app/dist /usr/share/nginx/html

# (Optional) Custom nginx config for React single-page app routing
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for ECS
EXPOSE 80

# Run nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
