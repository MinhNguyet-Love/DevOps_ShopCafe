# ===============================
# 🏗️ Stage 1: Build React app
# ===============================
FROM node:20-alpine AS build
WORKDIR /app

# Copy và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Copy source code & build
COPY . .
RUN npm run build

# ===============================
# 🌐 Stage 2: Serve qua Nginx
# ===============================
FROM nginx:1.27-alpine

# Copy build output từ stage trước
COPY --from=build /app/build /usr/share/nginx/html

# Copy file cấu hình Nginx để proxy /api
COPY nginx.conf /etc/nginx/nginx.conf

# Mở cổng 80 cho web
EXPOSE 80

# Chạy Nginx
CMD ["nginx", "-g", "daemon off;"]
