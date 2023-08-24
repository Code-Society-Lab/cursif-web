# pull base image
FROM node:18.17.1-buster-slim

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm --allow-root -g npm@latest expo-cli@latest

WORKDIR /app/
COPY . /app/

ENV PATH /opt/app/.bin:$PATH
RUN npm install

# for now we run it in dev
ENTRYPOINT ["npm", "next", "dev"]