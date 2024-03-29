FROM alpine:latest


ARG CTF=ctf.sh
ENV CTF=$CTF

# Install SSH server and any other dependencies.
# If behind corporate firewall, may need --no-check-certificate
RUN apk update --no-check-certificate && apk upgrade --no-check-certificate \
    && apk add openssh --no-check-certificate \
    && apk add cmatrix --no-check-certificate \
    && rm -rf /var/cache/apk/*


# Configure SSH server for password authentication and set MaxAuthTries
# Note that default configuration is to allow password authentication anyways.
RUN sed -i 's/#PasswordAuthentication yes/PasswordAuthentication yes/' /etc/ssh/sshd_config && \
    sed -i 's/#MaxAuthTries 6/MaxAuthTries 10/' /etc/ssh/sshd_config && \
    sed -i 's/#PubkeyAuthentication yes/PubkeyAuthentication no/' /etc/ssh/sshd_config && \
    sed -i 's/#Port 22/Port 11235/' /etc/ssh/sshd_config


# Generate ssh host key.
RUN ssh-keygen -A 

# Add your script or exe to the container
ADD $CTF /usr/local/bin/$CTF

# Blank out welcome message.
RUN echo "" > /etc/motd

# Set execute permissions for the script/exe
RUN chmod +x /usr/local/bin/$CTF


# Expose SSH port
EXPOSE 11235

# Run a script to set the user password during container startup
COPY initialize.sh /usr/local/bin/initialize.sh
RUN chmod +x /usr/local/bin/initialize.sh
ENTRYPOINT ["/usr/local/bin/initialize.sh"]

 