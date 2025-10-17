# ==================== Stage 1: Build app ====================
FROM node:20-alpine AS build
WORKDIR /app

# Copy file cấu hình và cài dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ source code và build
COPY . .
RUN npm run build

# ==================== Stage 2: Serve bằng Nginx ====================
FROM nginx:1.27-alpine
WORKDIR /usr/share/nginx/html

# ✅ Copy đúng thư mục output của Vite (dist)
COPY --from=build /app/dist /usr/share/nginx/html

# Copy file cấu hình Nginx (nếu có)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
