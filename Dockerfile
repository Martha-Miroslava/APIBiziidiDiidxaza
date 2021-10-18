FROM node:14
WORKDIR /apiBiziidi
COPY package*.json ./
RUN npm install
ENV ACCESS_TOKEN_SECRET= ${{secrets.ACCESS_TOKEN_SECRET}}
ENV PORT= ${{ secrets.PORT }}
ENV HOST= ${{ secrets.HOST }}
ENV PASSWORD= ${{ secrets.PASSWORD }} 
ENV PORT_EMAIL= ${{ secrets.PORT_EMAIL }}
ENV URI_PRODUCTION= ${{ secrets.URI_PRODUCTION }}
ENV USER_EMAIL= ${{ secrets.USER_EMAIL }}
ENV NODE_ENV= Production
COPY /src ./
CMD ["npm", "start"]
