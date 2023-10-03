#!/bin/bash

ssh -i $1 ubuntu@ec2-13-53-79-119.eu-north-1.compute.amazonaws.com << 'ENDSSH'

cd /var/www/my-recipes/backend
git stash
git pull
docker compose -f ./docker-compose.prod.yaml up --build -d

cd /var/www/my-recipes/frontend
git stash
git pull
docker compose -f ./docker-compose.prod.yaml up --build -d