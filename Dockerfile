FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# ホストマシン上のファイルをコンテナ内にマウントします。
VOLUME ["/app"]

EXPOSE 3000

CMD ["npm", "start"]
