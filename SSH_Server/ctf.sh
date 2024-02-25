#!/bin/sh


# Prevent ctrl-z (job control)
trap "echo My patience is wearing thin..." SIGTSTP

# Prevent ctrl-c
trap "echo Nice try..." SIGINT

NC='\033[0m' 
RED='\033[0;31m'
GREEN='\033[1;92m'
CYAN='\033[0;36m'


timeout 3s cmatrix


# Substring to check for
substring=""

while true; do
    # Prompt user for input
    echo -e -n "${GREEN}Query?: ${NC}"
    read -r user_input
    #read -r -p "Query: " user_input

    # Check if the entered string contains the substring
    if [[ "$user_input" == *"$substring"* ]]; then
        echo "OMG..."
        echo -e "${CYAN}Nice!${NC}\n\n"

        # Don't use exit/break since this will kill the script and leave user in ssh terminal.
        pkill -u $(whoami) sshd
    else
        echo -e "${RED}Boo!${NC}\n"
    fi
done