FROM node:18-alpine

ARG NEXT_PUBLIC_GRAPHQL_ENDPOINT

WORKDIR /app

COPY package.json .

RUN npm install --omit=dev

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]