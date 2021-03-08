#/bin/bash

set -e

filename="home_dashboard_server.jar"
file_path="./build/$filename"
temp_file_path="./build/$filename.temp"

echo "Packaging into $filename..."
clj -X:uberjar uberjar :jar $temp_file_path

# delete previously built jar if it exists
if [[ -f "$file_path" ]]; then
  rm $file_path
fi

mv "$temp_file_path" "$file_path"

echo "Successfully packaged $filename into $file_path!"
