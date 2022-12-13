FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm i

COPY . .

ENV NODE_ENV=dev 

EXPOSE 8080

CMD ["npm","run","start-dev"]