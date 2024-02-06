# Server
 
Just login and see What happens with some Tampering

## Build Image
```sh
docker build -t login_jwt_server .
```


## Run
```sh
docker run -p 3000:81 -e SECRET_KEY='YOUR_SECRET_KEY' -e FLAG='YOUR_FLAG' --name server login_jwt_server
```
or with `env.list`

```sh
docker run -p 3000:81 --env-file ./env.list --name server login_jwt_server
```


