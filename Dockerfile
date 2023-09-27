FROM node:18.16-alpine

RUN mkdir -p /home/app

WORKDIR /home/app
COPY . /home/app

RUN rm -rf node_modules
RUN npm cache clean --force
RUN npm install
RUN npm run build
RUN npm run migration:run

CMD ["npm", "run", "start:prod"]