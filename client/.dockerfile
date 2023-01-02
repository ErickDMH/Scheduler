# Stage 1: install dependencies
FROM node:18-alpine AS dev
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY --chown=node:node . .

# Stage 2: build
FROM node:18-alpine AS build
WORKDIR /usr/src/app
COPY --from=dev /app/node_modules ./node_modules
COPY src ./src
COPY public ./public
COPY package.json next.config.js jsconfig.json ./
RUN npm run build

# Stage 3: run
FROM node:18-alpine AS prod
WORKDIR /usr/src/app
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package.json ./
CMD ["npm", "run", "start"]
