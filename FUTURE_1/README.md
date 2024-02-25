Future PTO

You want to prevent the user from exiting out of the script or tool:
```sh
#!/bin/sh

# Monitor mode + prevent ctrl-z
set +m

# Prevent ctrl-c
trap 'echo got SIGINT' SIGINT

# Your logic here
```

Easy CTF would to omit the `trap SIGNINT` and have the user try to escape or allow `ctrl-z`.


## Docker

### Build
```sh
docker build -t ssh_server .
```


### Run
```sh
docker run -e USERNAME=ctf_user -e PASSWORD=some_password -p 2222:22 --name ssh_ctf ssh_server
```


### Cleanup
```sh
docker stop ssh_ctf
docker rm ssh_ctf
docker rmi ssh_server
```

## Connecting
```sh
ssh ctf_user@127.0.0.1 -p 2222
```

or if you don't want to use client ssh_key:

```sh
ssh -X -o PubkeyAuthentication=false ctf_user@127.0.0.1 -p 2222
```


## Debug

Run interactively to debug configuration.
```sh
docker run --rm -it --entrypoint /bin/ash ssh_server
```

Look at standard out:
```sh
docker logs ssh_ctf
```