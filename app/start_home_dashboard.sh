#/bin/bash

set -e

# start the app and save pid to a file
# DISPLAY needs to be set in case this is executed through ssh
export DISPLAY=:0; java -Duser.country=FI -Duser.language=en -cp home_dashboard.jar clojure.main -m app.core & echo $! > ~/.home_dashboard_pid
