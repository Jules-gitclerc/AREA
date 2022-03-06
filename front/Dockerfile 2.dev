FROM node:16-buster AS dev

ENV NODE_ENV=development

WORKDIR /app
COPY package.json ./

RUN npm install
COPY . .

ENTRYPOINT ["npm", "run", "start"]
