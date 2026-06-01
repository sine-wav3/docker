FROM node:20
WORKDIR /usr/src/app
COPY package*.json ./
RUN pnpm install --frozen-lockfile 
COPY . . 
EXPOSE 3000
CMD ["node", "server.js"]
