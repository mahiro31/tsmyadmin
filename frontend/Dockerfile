# --- BUILD STAGE ---
FROM node:24-slim as builder

USER root

WORKDIR /app

RUN apt-get update && apt-get -qq install -y --no-install-recommends \
    tzdata \
    tini \
    && rm -rf /var/lib/apt/lists/*

COPY --chown=node:node package*.json ./

RUN npm install

# USER node

COPY --chown=node:node . .

# Next.jsのビルドコマンドを実行 (もし必要なら)
# RUN npm run build

# --- PRODUCTION STAGE ---
FROM node:24-slim as runner

USER root

WORKDIR /app

RUN apt-get update && apt-get -qq install -y --no-install-recommends \
    tzdata \
    tini \
    && rm -rf /var/lib/apt/lists/*

# 必要最小限のファイルをコピー
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/.next ./.next
COPY --from=builder --chown=node:node /app/public ./public

USER node

# Next.jsが使用するポートを公開
EXPOSE 3000

# 本番実行コマンド
# CMD ["npm", "run", "start"]

# 開発実行コマンド
CMD ["npm", "run", "dev"]
