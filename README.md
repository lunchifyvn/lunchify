# Lunchify Network

[![Build Status](https://travis-ci.org/lunchifyvn/lunchify.svg?branch=master)](https://travis-ci.org/lunchifyvn/lunchify)

# How to run

## With docker

Pull image from: `nqdinh/lunchify`.

Development: `docker run -e "FB_CLIENT_ID=" -e "FB_CLIENT_SECRET=" -t nqdinh/lunchify:latest`

Production: `docker run -e "NODE_ENV=production" "FB_CLIENT_ID=" -e "FB_CLIENT_SECRET=" -e "DB_MONGO_URL=" -t nqdinh/lunchify:latest`

## From shell

Development: `FB_CLIENT_ID= FB_CLIENT_SECRET= npm run start`

Production: `NODE_ENV = production FB_CLIENT_ID= FB_CLIENT_SECRET= DB_MONGO_URL= npm run start`
