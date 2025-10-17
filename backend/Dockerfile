FROM eclipse-temurin:17-jdk AS build
WORKDIR /app

# Copy toàn bộ source vào container
COPY . .

# ✅ Thêm dòng này để cấp quyền chạy file mvnw
RUN chmod +x mvnw

# Build project
RUN ./mvnw clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
