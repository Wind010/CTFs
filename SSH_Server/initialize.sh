#!/bin/sh


# Set the username and password
CTF_USERNAME=${CTF_USERNAME:-ctf_user}
PASSWORD=${PASSWORD:-some_password}
CTF=${CTF:-ctf.sh}

# Create the user if it doesn't exist for ssh login
if ! getent passwd $CTF_USERNAME > /dev/null 2>&1; then
    adduser -D -s /bin/ash $CTF_USERNAME
fi

# Set the password for the specified user
echo "$CTF_USERNAME:$PASSWORD" | chpasswd

cp "/usr/local/bin/$CTF" "/home/$CTF_USERNAME/$CTF"
chmod +x "/home/$CTF_USERNAME/$CTF"

# Modify .profile to automatically run the script/exe upon login
echo "/home/$CTF_USERNAME/$CTF" >> /home/$CTF_USERNAME/.profile 
echo "exec /bin/ash" >> /home/$CTF_USERNAME/.profile


echo "Starting SSH server..."
exec /usr/sbin/sshd -D
echo "SSH server initialized"
