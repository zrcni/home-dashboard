#/bin/bash

# exit when any command fails
set -e

# if [ -z "$1" ]; then
#   echo "provide output filename as the first argument!"
#   exit 1
# fi

# filename=$1

filename="home_dashboard.jar"
file_path="./build/$filename"
temp_file_path="./build/$filename.temp"

echo "Packaging temporarily into $temp_file_path..."
clj -X:uberjar uberjar :jar $temp_file_path

# delete previously built jar if it exists
if [[ -f "$file_path" ]]; then
  rm $file_path
fi

mv "$temp_file_path" "$file_path"

echo "Successfully packaged $filename into $file_path!"
