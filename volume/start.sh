#!/bin/bash

#暂未启用

yum -y install wget yarn \
&& cd /opt \
&& wget http://nodejs.org/dist/latest-v8.x/node-v8.16.1-linux-x64.tar.gz \
&& tar -zxf node-v8.16.1-linux-x64.tar.gz \
&& mv node-v8.11.1-linux-x64 node \
&& rm -rf node-v8.16.1-linux-x64.tar.gz \
&& ln -s /opt/node/bin/node /usr/bin/node \
&& ln -s /opt/node/bin/npm /usr/bin/npm \
&& curl --silent --location https://dl.yarnpkg.com/rpm/yarn.repo | tee /etc/yum.repos.d/yarn.repo \
&& yum -y install yarn \
&& yarn global add pm2@2.10.2 \
&& cd /app \
&& yarn install \
&& npm run build \
&& yum -y install nginx \
&& cat volume/nginx.conf > /etc/nginx/nginx.conf \
&& cp /app/volume/nextssr.conf /etc/nginx/conf.d \
&& mkdir -p /export/logs \
&& /usr/sbin/nginx \
&& pm2 startOrRestart ecosystem.config.js

