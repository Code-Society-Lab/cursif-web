FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install --only=production

COPY . .

RUN npm run build

CMD ["npm", "run", "start"]