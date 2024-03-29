FROM node:18-alpine

WORKDIR /user/src/app

COPY . .

RUN npm ci --legacy-peer-deps

RUN npm run build

USER node

CMD ["npm", "run", "start:dev"]