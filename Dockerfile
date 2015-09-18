FROM node:0.12.2

COPY . /app

RUN apt-get update && apt-get install -y ruby-compass
RUN npm install -g bower grunt-cli
RUN cd /app; npm install; bower install --allow-root;

WORKDIR /app

EXPOSE 5000

CMD ["grunt", "serve"]

