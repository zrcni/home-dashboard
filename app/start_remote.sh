#/bin/bash

# exit when any command fails
set -e

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

# ping the IP address
isonline=`ping -c 1 $device_ip | grep "1 received"`

if [ -z "$isonline" ]; then
	echo "Ping to $device_ip was unsuccessful."
	exit 1
else
	echo "Pinged $device_ip successfully!"
fi

log_file_path="~/logs/home_dashboard_app_$(date +%s).log"
# run the jar
echo "Starting the app"
ssh $ssh_opts $device_user@$device_ip "nohup ~/start_home_dashboard.sh </dev/null > $log_file_path 2>&1 &"
