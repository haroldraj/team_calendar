# Build stage
FROM node:18 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18 AS production
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm install --only=production
EXPOSE 3000
CMD ["node", "dist/main"]