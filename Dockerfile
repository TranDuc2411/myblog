# Use an official Node.js runtime as a parent image
FROM node:18.16.0

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install 

COPY . .

# EXPOSE 7777

CMD [ "npm", "start" ]
