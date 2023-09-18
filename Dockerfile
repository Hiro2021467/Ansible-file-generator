FROM node:latest

RUN npm install -g npm@latest

WORKDIR /my-app

EXPOSE 5173

CMD npm install && npm run dev -- --host