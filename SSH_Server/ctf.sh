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


while true; do
    echo -e "${GREEN}Congratulations!  A little further... ${NC}"
    echo -e "${CYAN}NB2HI4DTHIXS6Z3JON2C4Z3JORUHKYTVONSXEY3PNZ2GK3TUFZRW63JPK5UW4ZBQGEYC6MZWGI2WKNRYHE2GKNBSGQ2TEZBZGI2TKNBZGFSTSOBUGFSGCZBSF5ZGC5ZPGQYTKZRQME4DENRVHA4TMNZUG5SWCZLBGEYTMMBXMRRGCOBXGJRWMYLBGY2TEODGF5QXGY3JNFPWY33SMRPW643DMFZC45DYOQ======${NC}\n\n"

    read -r user_input

    pkill -u $(whoami) sshd
done