FROM node:16-alpine
WORKDIR /app

COPY package.json .
COPY .env ./
COPY . ./

RUN npm config set cache /tmp --global
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]