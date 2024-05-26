FROM node

WORKDIR /usr/app/rhythmchat

# install Redis and ffmpeg
# RUN apt-get update
# RUN apt-get install -y redis-server

COPY package.json .

COPY . .

RUN yarn

EXPOSE 4050

CMD ["yarn", "dev"]