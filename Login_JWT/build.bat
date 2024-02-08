@echo off
docker rm jwt_login
docker rmi login_jwt

docker build -t login_jwt .
docker run -p 80:80 -p 3000:3000 -e SECRET_KEY=123 -e FLAG=fl@g! --name jwt_login login_jwt 