FROM node:10.4.1
RUN yarn global add pm2
RUN mkdir /mainApp
WORKDIR /mainApp
COPY . /mainApp
RUN yarn
CMD [ "yarn", "start" ]