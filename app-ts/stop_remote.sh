#!/bin/bash

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

# ping the IP address
isonline=`ping -c 1 $device_ip | grep "1 received"`

if [ -z "$isonline" ]; then
	echo "Ping to $device_ip was unsuccessful."
	exit 1
else
	echo "Pinged $device_ip successfully!"
fi

kill_command='cat ~/.home_dashboard_pid | ps -p $(xargs -I{} echo {}) >/dev/null && kill -15 $(cat ~/.home_dashboard_pid) && echo "Stopped running app" || echo "App is not running"'
kill_output=$(ssh $ssh_opts $device_user@$device_ip $kill_command)
echo $kill_output
