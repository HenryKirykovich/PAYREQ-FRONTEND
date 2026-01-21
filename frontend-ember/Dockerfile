FROM nginx:1.28-bookworm
RUN apt-get -y update && \
    apt-get -y install nodejs npm git yarnpkg
COPY package.json /tmp/bower/package.json
RUN cd /tmp/bower && yarnpkg install && \
    mkdir -p /usr/share/nginx/html/lib && \
    cp -r node_modules/@bower_components/* /usr/share/nginx/html/lib
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/conf.d/default.conf /etc/nginx/conf.d/default.conf
COPY src /usr/share/nginx/html/app
