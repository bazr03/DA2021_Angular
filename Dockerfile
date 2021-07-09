FROM node:lts
# WORKDIR /app
# COPY package.json .
# RUN npm install -g npm@latest
# RUN npm install
# COPY . .
# EXPOSE 4200 49153

RUN mkdir /home/node/app && chown node:node /home/node/app
RUN mkdir /home/node/app/node_modules && chown node:node /home/node/app/node_modules
WORKDIR  /home/node/app
USER node
COPY --chown=node:node package.json package-lock.json ./
RUN npm ci --quiet
COPY --chown=node:node . .
CMD npm run start