# ---------- BUILD ----------
FROM node:22-alpine AS build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx tsc
# ---------- PRODUCTION ----------
FROM node:22-alpine AS prod

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/index.js"]