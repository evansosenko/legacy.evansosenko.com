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
[evansosenko/caddy-evansosenko.com]: https://hub.docker.com/r/evansosenk/caddy-evansosenko.com/

### Running

```
$ docker run -d caddy-evansosenko.com \
  -v $HOME/.caddy:/root/.caddy \
  -p 443:443 \
  -e FQDN=evansosenko.com \
  -e EMAIL=razorx@evansosenko.com \
  -e REPO=https://github.com/evansosenko/evansosenko.github.io.git \
  -e BRANCH=deploy-production \
  -e WEBHOOK_SECRET=secretkey
```

## License

This docker image is licensed under the MIT license.

## Warranty

This software is provided "as is" and without any express or
implied warranties, including, without limitation, the implied
warranties of merchantibility and fitness for a particular
purpose.
