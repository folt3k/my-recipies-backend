#!/bin/bash

CONTAINER_NAME=MyRecipesBackendApp;
IMAGE_NAME=my-recipes-backend-app

docker build -t $IMAGE_NAME ..
docker ps -q --filter "name=$CONTAINER_NAME" | grep -q . &&
  docker stop $CONTAINER_NAME > /dev/null &&
  docker rm -fv $CONTAINER_NAME > /dev/null
docker run -d -p 3000:3000 --name $CONTAINER_NAME $IMAGE_NAME