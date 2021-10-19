FROM node:14
WORKDIR /apibiziidi
COPY package*.json ./
RUN npm install
EXPOSE 8000
COPY /src ./
CMD ["npm", "start"]
