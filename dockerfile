FROM node:21-alpine3.19

WORKDIR /app

COPY package*.json ./

RUN npm install -g turbo

COPY . .

RUN yarn

EXPOSE 3000
EXPOSE 4000
EXPOSE 5000     

RUN yarn workspace api prisma db push
RUN turbo build
CMD ["turbo", "start"]



