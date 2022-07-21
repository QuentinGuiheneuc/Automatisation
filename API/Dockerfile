FROM node:alpine
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN npm install
RUN npm upgrade
COPY . .
EXPOSE 3007
STOPSIGNAL SIGTERM
CMD ["npm","start","/app"]
