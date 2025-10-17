# ===============================
# 🏗️ Stage 1: Build ứng dụng Java
# ===============================
FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

# Copy toàn bộ source và build bằng Maven
COPY . .
RUN ./mvnw clean package -DskipTests

# ===============================
# 🚀 Stage 2: Runtime (JRE)
# ===============================
FROM eclipse-temurin:17-jre
WORKDIR /app

# Copy file JAR từ stage build sang
COPY --from=build /app/target/*.jar app.jar

# Cấu hình môi trường
ENV SPRING_PROFILES_ACTIVE=prod
ENV SERVER_PORT=8080
EXPOSE 8080

# Chạy app
ENTRYPOINT ["java", "-jar", "app.jar"]
