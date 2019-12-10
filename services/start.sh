#!/bin/bash

#Let's start the server first
/usr/sbin/nginx

# We need to enter our code repo before executing the pm2 runtime
cd /code

# generate the APP KEY with adonis
adonis key:generate

# pm2 runtime is executed for production while
if [ $1 == "prod" ];
then
  pm2-runtime start server.js
else
  pm2-dev start server.js
fi
