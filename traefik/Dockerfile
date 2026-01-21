FROM traefik:3.6.4

ADD ./docker/init.sh /
ADD ./docker/traefik.yml /etc/traefik/traefik.yml
ADD ./docker/provided.yml /etc/traefik/provided.yml

ENTRYPOINT ["/init.sh"]
