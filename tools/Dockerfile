# Use the Alpine Linux base image
FROM alpine:latest

# Install sshpass
RUN apk --no-cache add openssh-client sshpass --no-check-certificate

# CMD to keep the container running
CMD ["tail", "-f", "/dev/null"]