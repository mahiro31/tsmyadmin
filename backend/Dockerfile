FROM node:24-slim

WORKDIR /app

RUN apt-get update && apt-get -qq install -y --no-install-recommends \
    tzdata \
    tini \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

ENV NODE_ENV ${NODE_ENV}

COPY --chown=node:node package*.json ./
COPY --chown=node:node . .

RUN npm install

# Build (もし必要なら)
RUN npm run build

USER node

# Expose the port NestJS will use
EXPOSE 3001

# Start the server
# または 'npm run start:dev' など、開発コマンドに合わせる
CMD ["npm", "run", "start"] 