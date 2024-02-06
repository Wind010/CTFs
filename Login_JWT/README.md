# Login

## CTF 02072024

Time: Wednesday, February 7th 2024

Location:  Baldur's Gate 3 - Act 3

Just login and see What happens with some Tampering



### Client

```sh
cd client
docker build -t CTF02022024_client .
```

### Server
```sh
cd server
docker build -t CTF02022024_server .
```


### Docker-Compose

```sh
docker compose up
```

If you want to rebuild the images after some changes:
```sh
docker compose up build
```

#### Tear down
```sh
docker compose down
```