FROM node:22-alpine

WORKDIR /app

RUN npm install -g @angular/cli

# パッケージファイルをコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

VOLUME ["/app"]
EXPOSE 4200

CMD ["npm", "start"]
