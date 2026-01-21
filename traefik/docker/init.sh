#!/bin/sh
set -e
sed -i "s|COMPOSE_PROJECT_NAME|${COMPOSE_PROJECT_NAME}|g" /etc/traefik/traefik.yml
sed -i "s|COMPOSE_PROJECT_NAME|${COMPOSE_PROJECT_NAME}|g" /etc/traefik/provided.yml
sed -i "s|NGROK_DOMAIN|${NGROK_DOMAIN}|g" /etc/traefik/traefik.yml
sed -i "s|NGROK_DOMAIN|${NGROK_DOMAIN}|g" /etc/traefik/provided.yml
traefik

