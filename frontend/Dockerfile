FROM node:20-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
# ---------- Stage 1: Build React app ----------
FROM node:20 AS build
WORKDIR /app

# Cài dependencies
COPY package*.json ./
RUN npm install

# ✅ Nhận biến môi trường từ CI/CD
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Copy source và build
COPY . .
RUN npm run build

# ---------- Stage 2: Serve with nginx ----------
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
