#/bin/bash

# exit when any command fails
set -e

# get Raspberry Pi's information from config file
device_ip=$(grep -oP '(?<=\brpi_ip=)[^\n]+' ~/.smappa)
device_user=$(grep -oP '(?<=\brpi_user=)[^\n]+' ~/.smappa)
filename="home_dashboard.jar"
file_path="./build/$filename"
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

if [[ ! -f "$file_path" ]]; then
  echo "File does not exist in path: $file_path"
  exit 1
fi

# # copy the jar to Raspberry Pi's home directory
rsync -avz --quiet -e "ssh $ssh_opts" "$file_path" "$device_user@$device_ip:~/"
rsync -avz --quiet -e "ssh $ssh_opts" "$PWD/start_home_dashboard.sh" "$device_user@$device_ip:~/"

echo "Stopping the app if it's running"

kill_command='cat ~/.home_dashboard_pid | ps -p $(xargs -I{} echo {}) >/dev/null && kill -15 $(cat ~/.home_dashboard_pid) && echo "Stopped running app" || echo "App is not running"'
kill_output=$(ssh $ssh_opts $device_user@$device_ip $kill_command)

echo $kill_output

log_file_path="~/logs/home_dashboard_$(date +%s).log"
# run the jar
echo "Starting the app"
ssh $ssh_opts $device_user@$device_ip "nohup ~/start_home_dashboard.sh </dev/null > $log_file_path 2>&1 &"
