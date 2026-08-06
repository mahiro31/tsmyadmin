FROM node:22-alpine

WORKDIR /app

RUN npm install -g @angular/cli

COPY package*.json ./
RUN npm install

VOLUME ["/app"]
EXPOSE 4200

ENV NODE_ENV=${NODE_ENV}
ENV DB_HOST=${DB_HOST}
ENV DB_NAME=${DB_NAME}
ENV DB_USER=${DB_USER}
ENV DB_PASSWORD=${DB_PASSWORD}

CMD ["npm", "start"]
