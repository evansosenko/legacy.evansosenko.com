# Caddy Docker Image for evansosenko.com

## Description

Custom docker image for serving evansosenko.com with [Caddy].

[Caddy]: https://caddyserver.com

### Requirements

- [Docker].

The images are built and hosted automatically on Docker Hub
at [evansosenko/caddy-evansosenko.com].

Pull with

```
$ docker pull evansosenko/caddy-evansosenko.com
```

[Docker]: https://www.docker.com/
[evansosenko/caddy-evansosenko.com]: https://hub.docker.com/r/evansosenko/caddy-evansosenko.com/

### Running

```
$ docker run -d caddy-evansosenko.com \
  -v $HOME/.caddy:/root/.caddy \
  -p 443:443 \
  -e EMAIL=razorx@evansosenko.com \
  -e PRODUCTION_FQDN=evansosenko.com \
  -e PRODUCTION_REPO=https://github.com/evansosenko/evansosenko.github.io.git \
  -e PRODUCTION_BRANCH=deploy-production \
  -e STAGING_FQDN=staging.evansosenko.com \
  -e STAGING_REPO=https://github.com/evansosenko/evansosenko.github.io.git \
  -e STAGING_BRANCH=deploy-staging \
  -e WEBHOOK_SECRET=secretkey
```

## License

This docker image is licensed under the MIT license.

## Warranty

This software is provided "as is" and without any express or
implied warranties, including, without limitation, the implied
warranties of merchantibility and fitness for a particular
purpose.
