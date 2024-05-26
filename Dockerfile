FROM node:18-slim

WORKDIR /usr/app/rhythmchat

# # Install Redis and FFmpeg
# RUN apt-get update && \
#     apt-get install -y redis-server ffmpeg && \
#     rm -rf /var/lib/apt/lists/*

COPY package*.json .

COPY . .

RUN yarn

EXPOSE 4050

CMD ["yarn", "dev"]