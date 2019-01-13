FROM node:10.4.1
RUN npm install pm2 -g
RUN mkdir /mainApp
WORKDIR /mainApp
COPY . /mainApp
RUN yarn
CMD [ "yarn", "start" ]