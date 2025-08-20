## Build stage
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
# Copy backend source (the Dockerfile path is demo/, build context is repo root)
COPY demo/ .
RUN mvn -q -DskipTests package

## Runtime stage
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=build /app/target/demo-0.0.1-SNAPSHOT.jar /app/app.jar
# Render provides PORT; Spring reads it via server.port=${PORT}
ENV JAVA_OPTS=""
EXPOSE 8080
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]

