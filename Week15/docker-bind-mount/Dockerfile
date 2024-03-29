FROM node:21-alpine

WORKDIR /nextapp

COPY package* .

RUN npm install

COPY . .

CMD [ "npm", "run","dev" ]