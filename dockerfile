FROM node:10
WORKDIR /app_front
COPY package*.json ./app_front/
RUN npm install
COPY . . /app_front/
CMD node server.js
EXPOSE 4442