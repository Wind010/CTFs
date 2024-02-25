#!/bin/sh


# Set the username and password
USERNAME=${USERNAME:-ctf_user}
PASSWORD=${PASSWORD:-some_password}
CTF=${CTF:-ctf.sh}

# Create the user if it doesn't exist for ssh login
if ! getent passwd $USERNAME > /dev/null 2>&1; then
    adduser -D -s /bin/ash $USERNAME
fi

# Set the password for the specified user
echo "$USERNAME:$PASSWORD" | chpasswd

cp "/usr/local/bin/$CTF" "/home/$USERNAME/$CTF"
chmod +x "/home/$USERNAME/$CTF"

# Modify .profile to automatically run the script/exe upon login
echo "/home/$USERNAME/$CTF" >> /home/$USERNAME/.profile 
echo "exec /bin/ash" >> /home/$USERNAME/.profile


echo "Starting SSH server..."
exec /usr/sbin/sshd -D
echo "SSH server initialized"
