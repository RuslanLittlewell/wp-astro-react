FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

FROM base AS dev
EXPOSE 4321
CMD ["npm", "run", "dev", "--", "--host", "--port", "4321"]

FROM base AS build
RUN npm run build

FROM node:20-alpine AS prod
WORKDIR /app
COPY --from=base /app/package*.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
EXPOSE 4321
CMD ["npm", "run", "preview", "--", "--host", "--port", "4321"]
