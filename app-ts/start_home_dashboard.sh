#/bin/bash

# This script is only ran on the remote device.

set -e

app_name="HomeDashboard"
ext="AppImage"
filename="$app_name.$ext"

if [[ ! -f "./$filename" ]];then
  echo "File $filename does not exist!"
fi

# start the app and save pid to a file
# DISPLAY needs to be set in case this is executed through ssh
export DISPLAY=:0; ./$filename & echo $! > ~/.home_dashboard_pid
