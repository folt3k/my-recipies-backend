#!/bin/bash

ssh -i $1 ubuntu@13.53.96.88 << 'ENDSSH'

cd /var/www/my-recipes/backend
git stash
git pull
docker compose -f ./docker-compose.prod.yaml up --build -d

cd /var/www/my-recipes/frontend
git stash
git pull
docker compose -f ./docker-compose.prod.yaml up --build -d