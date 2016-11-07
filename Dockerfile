FROM node:6.9.1-slim
MAINTAINER Dinh Nguyen <nqdinhddt@gmail.com>

# copy our application code
ADD ./ /opt/lunchify
WORKDIR /opt/lunchify

# fetch app specific deps
RUN npm install

# expose port
EXPOSE 3000

# start app
CMD ["npm", "start"]
