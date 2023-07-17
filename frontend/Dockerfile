FROM node:alpine3.18
WORKDIR /app
COPY package*.json .
RUN npm i
COPY ./frontend .
RUN chown -R node:node /app
EXPOSE 3000
USER node
CMD ["npm", "start""]
