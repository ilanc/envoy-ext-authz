# notes

## get code to work

- slightly out of date (was written nearly 2 years ago)
  - see https://github.com/rickcodetalk/envoy-ext-authz

```sh
curl -v localhost:8000/service/1 # 401: Unauthorized
curl -v -H "Authorization: Basic cmlja2xlZToxMjM0NTY=" localhost:8000/service/1 # 200: Hello from behind Envoy (service 1)! hostname: f862bcfb12e8 resolvedhostname: 172.30.0.2
curl -v -H "Authorization: Basic cmlja2xlZToxMjM0NTY=" localhost:8000/service/2 # 200: Hello from behind Envoy (service 2)! hostname: 2ddeebe5b58d resolvedhostname: 172.30.0.4
```

- basic auth is base64 encoded `${username}:${password}`
  - generate using `node createBasicAuth.js`
- public services:
  - front-envoy:
    - 8000 = proxied to service1 & service2
      - NOTE: requestor chooses service by using a different path `/service/1` or `/service/2`
      - there are 2 clusters `service1` and `service2` - each with only 1 host - see [front-envoy.yaml](./front-envoy.yaml)
    - 8001 = envoy stats e.g. `curl localhost:8001/stats` && `curl localhost:8001/server_info`
  - authz:
    - 8080 = can query authz directly from host
- how this reflects in `docker ps -a`:
  ```txt
  (local, /spike/v8) ilan@ilan:/spike/prototype/envoy-ext-authz$ docker ps -a
  CONTAINER ID        IMAGE                         COMMAND                  CREATED             STATUS                        PORTS                                                     NAMES
  233ac8bfefc0        envoy-ext-authz_front-envoy   "/usr/bin/dumb-init …"   43 minutes ago      Up 43 minutes                 0.0.0.0:8001->8001/tcp, 10000/tcp, 0.0.0.0:8000->80/tcp   envoy-ext-authz_front-envoy_1
  2ddeebe5b58d        envoy-ext-authz_service2      "/bin/sh -c /usr/loc…"   43 minutes ago      Up 43 minutes                 80/tcp, 10000/tcp                                         envoy-ext-authz_service2_1
  f862bcfb12e8        envoy-ext-authz_service1      "/bin/sh -c /usr/loc…"   43 minutes ago      Up 43 minutes                 80/tcp, 10000/tcp                                         envoy-ext-authz_service1_1
  24397a57b322        envoy-ext-authz_authz         "docker-entrypoint.s…"   43 minutes ago      Up 43 minutes                 0.0.0.0:8080->8080/tcp                                    envoy-ext-authz_authz_1
  ```
  - i.e. publicly exposed host ports reflect with arrow as: `0.0.0.0:8000->80/tcp`
    - the host port is before the arrow (i.e. `8000` not `80`)
  - and internal container ports without arrow as `80/tcp`

## prettier

- front-envoy.yaml and service-envoy.yaml have different indenting to default prettier rules
- prettier-fied and rebuilt and all still works. Even tested `docker-compose scale service1=3` and it works like a charm!
