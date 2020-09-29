# notes

## get code to work

- slightly out of date (was written nearly 2 years ago)
  - see https://github.com/rickcodetalk/envoy-ext-authz

```sh
curl -v localhost:8000/service/1 # 401: Unauthorized
curl -v -H "Authorization: Basic cmlja2xlZToxMjM0NTY=" localhost:8000/service/1 # 200: Hello from behind Envoy (service 1)! hostname: f862bcfb12e8 resolvedhostname: 172.30.0.2
```

- basic auth is base64 encoded `${username}:${password}`
  - generate using `node createBasicAuth.js`
