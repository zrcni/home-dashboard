#!/bin/bash

# tail the latest log file on the Raspberry Pi

# get Raspberry Pi's information from config file
device_ip=$(grep -oP '(?<=\brpi_ip=)[^\n]+' ~/.smappa)
device_user=$(grep -oP '(?<=\brpi_user=)[^\n]+' ~/.smappa)
ssh_opts="-i $HOME/.ssh/id_rsa.pub"

if [ -z "$device_ip" ]; then
  echo "Device's IP address couldn't be found in ~/.smappa"
  exit 1
fi

if [ -z "$device_user" ]; then
  echo "Device's user couldn't be found in ~/.smappa"
  exit 1
fi

ssh $ssh_opts -t $device_user@$device_ip 'tail -f "$HOME/logs/$(ls -t $HOME/logs/ | head -1)"'
