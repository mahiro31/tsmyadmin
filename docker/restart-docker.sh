#!/bin/bash

# Docker Composeを使用してサービスを再起動
docker compose down
docker compose up --build -d

echo "Docker containers are restarting..."
