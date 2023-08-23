#!/bin/bash

docker compose -f ../docker-compose.dev.yaml up --build -d
docker exec MyRecipesBackendApp npm run seed