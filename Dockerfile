FROM arm64/node:14
WORKDIR /apibiziidi
COPY package*.json ./
RUN npm install
COPY /src ./
CMD ["npm", "start"]
