FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install -g prisma

RUN prisma generate --schema src/prisma/schema.prisma

EXPOSE 5012

CMD ["npm", "run", "dev"]
