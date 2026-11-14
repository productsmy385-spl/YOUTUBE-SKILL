FROM node:20-bookworm-slim

WORKDIR /app

# Install FFmpeg and Telugu unicode fonts
RUN apt-get update && apt-get install -y --no-install-recommends \
    ffmpeg \
    fonts-lohit-telu \
    fonts-deva \
    fonts-indic \
    fontconfig \
    ca-certificates \
    && fc-cache -f -v \
    && rm -rf /var/lib/apt/lists/*

COPY package.json yarn.lock* ./
RUN yarn install --production --frozen-lockfile --network-timeout 100000

COPY . .

ENV NODE_ENV=production

CMD ["npx", "ts-node", "worker/index.ts"]

