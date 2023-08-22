FROM node:18.16-alpine

RUN mkdir -p /home/app

WORKDIR /home/app
COPY . /home/app

RUN npm install
RUN npm run build

CMD ["npm", "run", "start:prod"]