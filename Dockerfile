FROM node:22-alpine

WORKDIR /app

RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm install

VOLUME ["/app"]
EXPOSE 4200

CMD ["npm", "start"]
