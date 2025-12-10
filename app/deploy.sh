#/bin/bash

# Copies app to the remote device, stops running app and starts the new version of the app.

set -e

# get Raspberry Pi's information from config file
device_ip=$(grep -oP '(?<=\brpi_ip=)[^\n]+' ~/.smappa)
device_user=$(grep -oP '(?<=\brpi_user=)[^\n]+' ~/.smappa)
ssh_file=$(grep -oP '(?<=\bssh_file=)[^\n]+' ~/.smappa)
ssh_opts="-i $ssh_file"

version=$(cat ./package.json | jq .version | sed 's/"//g')
app_name=$(cat ./package.json | jq .build.productName | sed 's/"//g')
arch="armv7l"
ext="AppImage"
build_path="./release/build"
filename="$app_name-$version-$arch.$ext"
file_path="$build_path/$filename"
out_filename="$app_name.$ext"

if [[ ! -f "$file_path" ]]; then
  echo "File \"$filename\" does not exist in build path \"$build_path\"!"
  exit 1
fi

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

echo "Copying files..."

# # copy the jar to Raspberry Pi's home directory
rsync -avz --quiet -e "ssh $ssh_opts" "$file_path" "$device_user@$device_ip:~/$out_filename"
rsync -avz --quiet -e "ssh $ssh_opts" "$PWD/start_home_dashboard.sh" "$device_user@$device_ip:~/"

kill_command='cat ~/.home_dashboard_pid | ps -p $(xargs -I{} echo {}) >/dev/null && kill -15 $(cat ~/.home_dashboard_pid) && echo "Stopped running app" || echo "App is not running"'
kill_output=$(ssh $ssh_opts $device_user@$device_ip $kill_command)
echo $kill_output

log_file_path="~/logs/home_dashboard_app_$(date +%s).log"
# run the jar
echo "Starting the app"
ssh $ssh_opts $device_user@$device_ip "nohup ~/start_home_dashboard.sh </dev/null > $log_file_path 2>&1 &"
