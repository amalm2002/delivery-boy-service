FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

RUN cp -r src/proto dist/

EXPOSE 3006

CMD ["node", "dist/server.js"]
