FROM node

WORKDIR /app

EXPOSE 3000

COPY package.json /app/package.json

RUN npm install

COPY . /app


CMD ["npm","start"]

# docker build -t books .
# then
# docker run -p 8080:3000 books