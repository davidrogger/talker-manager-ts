FROM node:alpine3.18
WORKDIR /app
COPY package*.json .
RUN npm i
RUN chown -R node:node /app
USER node
EXPOSE 3000
COPY ./frontend .
CMD ["npm", "start"]