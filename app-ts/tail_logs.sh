#!/bin/bash

# tail the latest log file on the Raspberry Pi

# get Raspberry Pi's information from config file
device_ip=$(grep -oP '(?<=\brpi_ip=)[^\n]+' ~/.smappa)
device_user=$(grep -oP '(?<=\brpi_user=)[^\n]+' ~/.smappa)
ssh_file=$(grep -oP '(?<=\bssh_file=)[^\n]+' ~/.smappa)
ssh_opts="-i $ssh_file"

if [ -z "$device_ip" ]; then
  echo "Device's IP address couldn't be found in ~/.smappa"
  exit 1
fi

if [ -z "$device_user" ]; then
  echo "Device's user couldn't be found in ~/.smappa"
  exit 1
fi

ssh $ssh_opts -t $device_user@$device_ip 'tail -f "$(ls -t $HOME/logs/home_dashboard_app* | head -1)"'
